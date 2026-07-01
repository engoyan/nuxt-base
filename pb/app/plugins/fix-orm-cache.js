import { Query } from "pinia-orm";

export default defineNuxtPlugin(() => {
  const original = Query.prototype.getHydratedModel;
  Query.prototype.getHydratedModel = function (record, options) {
    this.getNewHydrated = true;
    return original.call(this, record, options);
  };
});
