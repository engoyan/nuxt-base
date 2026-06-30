import { Model, useRepo } from "pinia-orm";
import { usePocketBase } from "../composables/pocketbase";

export default class BaseModel extends Model {
  // Override in subclasses to map PB snake_case → camelCase
  // e.g. { first_name: 'firstName', job_title: 'jobTitle' }
  static fieldMapping = {};

  // Override in subclasses to auto-generate URLs for file fields
  // e.g. { avatar: '300x300' } → adds avatarUrl to each record
  // Use empty string for original size: { avatar: '' }
  static fileFields = {};

  static mapRecord(record) {
    const mapping = this.fieldMapping;
    const mapped = Object.keys(mapping).length
      ? Object.fromEntries(
          Object.entries(record).map(([k, v]) => [mapping[k] || k, v]),
        )
      : { ...record };

    this._applyFileUrls(mapped);
    return mapped;
  }

  static _applyFileUrls(record) {
    const pb = usePocketBase();
    const ref = { id: record.id, collectionName: this.entity };

    for (const [field, thumb] of Object.entries(this.fileFields)) {
      const filename = record[field];
      record[`${field}Url`] = filename
        ? pb.files.getURL(ref, filename, thumb ? { thumb } : {})
        : "";
    }
  }

  static unmapRecord(data) {
    const reverse = {};
    for (const [pbKey, modelKey] of Object.entries(this.fieldMapping)) {
      reverse[modelKey] = pbKey;
    }
    if (!Object.keys(reverse).length) return data;

    const unmapped = {};
    for (const [key, value] of Object.entries(data)) {
      unmapped[reverse[key] || key] = value;
    }
    return unmapped;
  }

  static async load(options = {}) {
    const pb = usePocketBase();
    const repo = useRepo(this);
    const records = await pb.collection(this.entity).getFullList(options);
    const mapped = records.map((r) => this.mapRecord(r));
    repo.flush();
    repo.save(mapped);
    return mapped;
  }

  static async subscribe() {
    const pb = usePocketBase();
    const repo = useRepo(this);

    await pb.collection(this.entity).subscribe("*", (e) => {
      if (e.action === "delete") {
        repo.destroy(e.record.id);
      } else {
        repo.save(this.mapRecord(e.record));
      }
    });
  }

  static async sync(options = {}) {
    await this.load(options);
    await this.subscribe();
  }

  /** Load from PB only (no subscribe). Use on server after admin auth. */
  static async loadOnly(options = {}) {
    return this.load(options);
  }

  /** Subscribe to real-time only (no initial load). Use on client when data was loaded on server. */
  static async subscribeOnly() {
    return this.subscribe();
  }

  static unsubscribe() {
    const pb = usePocketBase();
    pb.collection(this.entity).unsubscribe("*");
  }

  static getFileUrl(record, filename, options = {}) {
    const pb = usePocketBase();
    return pb.files.getURL(
      { id: record.id, collectionName: this.entity },
      filename,
      options,
    );
  }

  getFileUrl(field, options = {}) {
    const filename = this[field];
    if (!filename) return "";
    return this.constructor.getFileUrl(this, filename, options);
  }

  static async update(id, data) {
    const pb = usePocketBase();
    const unmapped = this.unmapRecord(data);
    const hasFiles = Object.values(unmapped).some(
      (v) => v instanceof File || v instanceof Blob,
    );
    if (hasFiles) {
      const fd = new FormData();
      for (const [key, value] of Object.entries(unmapped)) {
        if (value instanceof File || value instanceof Blob) fd.append(key, value);
        else if (value != null) fd.append(key, value);
      }
      return await pb.collection(this.entity).update(id, fd);
    }
    return await pb.collection(this.entity).update(id, unmapped);
  }

  async create(data) {
    const pb = usePocketBase();
    const collectionName = this.constructor.entity;
    const unmapped = this.constructor.unmapRecord(data);
    const record = await pb.collection(collectionName).create(unmapped);
    return record;
  }
}
