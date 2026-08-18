import PocketBase from "pocketbase";

export function getPocketBaseUrl() {
  const config = useRuntimeConfig();
  const { host, port } = config.public.pocketbase;
  return host.startsWith("https") ? host : `${host}:${port}`;
}

/**
 * Creates a fresh PB instance from the request cookie and attaches it
 * to `event.context`. Every /api/ handler can then use `event.context.pb`
 * without creating its own instance.
 *
 * Returns { pb, user } — user is null when the cookie is missing/invalid.
 */
export async function loadPBFromRequest(event: any) {
  const pb = new PocketBase(getPocketBaseUrl());
  const authHeader = getHeader(event, "auth") || "";
  const cookie = getHeader(event, "cookie") || "";

  const authSource = authHeader || cookie;
  if (authSource) {
    const cookieStr = authSource.includes("pb_auth=") ? authSource : `pb_auth=${authSource}`;
    pb.authStore.loadFromCookie(cookieStr);
  }

  const user = pb.authStore.isValid ? pb.authStore.record : null;

  event.context.pb = pb;
  event.context.auth = {
    user,
    isAdmin: user?.collectionName === "_superusers",
  };

  return { pb, user };
}

/**
 * Throws 401 if the request doesn't meet the required auth level.
 */
export function requireAuth(event: any, { admin = false } = {}) {
  const { user, isAdmin } = event.context.auth || {};

  if (!user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  if (admin && !isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden — admin required" });
  }
}
