import { Model } from "pinia-orm";

export default class UserData extends Model {
  static entity = "user-data";
  static fields() {
    return {
      id: this.uid(),
      count: this.number(1),
    };
  }
}
