// composables/pocketbase.ts
import PocketBase from "pocketbase";

let pb: PocketBase | null = null;

// pb.authStore?.record?.isAdmin = () => {
//   return pb.authStore?.record?.collectionName === "_superusers";
// };

export const usePocketBase = () => {
  if (!pb) {
    const config = useRuntimeConfig();
    const { host, port } = config.public.pocketbase;

    // if you are using https assume it's production and do not use port
    const url = host.startsWith("https") ? host : `${host}:${port}`;

    pb = new PocketBase(url);
  }
  return pb;
};
