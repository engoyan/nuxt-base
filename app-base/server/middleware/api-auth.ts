import { loadPBFromRequest, requireAuth } from "../utils/protectRoute";

/**
 * Convention-based API auth middleware.
 *
 * Every /api/ request gets a PB instance attached to event.context.pb.
 * Auth enforcement: require admin for all /api/ routes except public ones.
 *
 * Configure public routes via runtimeConfig.apiAuth.publicPrefixes (all methods)
 * and runtimeConfig.apiAuth.publicGetPrefixes (GET only).
 * Default: /api/auth/ is always public.
 */
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/")) return;

  await loadPBFromRequest(event);

  if (isPublic(event)) return;

  requireAuth(event, { admin: true });
});

function isPublic(event: any): boolean {
  const path = event.path;
  const method = event.method?.toUpperCase() || "GET";

  if (path.startsWith("/api/auth/")) return true;

  const config = useRuntimeConfig();
  const publicPrefixes: string[] = config.apiAuth?.publicPrefixes || [];
  const publicGetPrefixes: string[] = config.apiAuth?.publicGetPrefixes || [];

  if (publicPrefixes.some((prefix: string) => path.startsWith(prefix))) return true;
  if (method === "GET" && publicGetPrefixes.some((prefix: string) => path.startsWith(prefix))) return true;

  return false;
}
