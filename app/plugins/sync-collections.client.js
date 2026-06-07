const SYNC_MODELS = [];

export default defineNuxtPlugin(async () => {
  await Promise.all(
    SYNC_MODELS.map((M) =>
      M.sync().catch((err) =>
        console.warn(`[sync] ${M.entity}:`, err?.message),
      ),
    ),
  );
});
