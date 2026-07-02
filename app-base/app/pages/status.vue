<template>
  <v-container
    max-width="560"
    class="py-8"
  >
    <div class="text-center mb-8">
      <v-icon
        size="48"
        :color="allOk ? 'success' : hasFail ? 'error' : 'warning'"
        class="mb-3"
      >
        {{
          allOk
            ? "mdi-check-decagram"
            : hasFail
              ? "mdi-alert-circle"
              : "mdi-alert-circle-outline"
        }}
      </v-icon>
      <h1 class="text-h4 font-weight-bold">System Status</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">
        {{
          !done
            ? "Running checks\u2026"
            : allOk
              ? "All systems operational"
              : "Some checks need attention"
        }}
      </p>
    </div>

    <!-- Health checks -->
    <v-card
      variant="outlined"
      class="rounded-xl mb-6"
    >
      <v-list
        lines="two"
        class="py-1"
      >
        <v-list-item
          v-for="(c, i) in checks"
          :key="i"
        >
          <template #prepend>
            <v-progress-circular
              v-if="c.status === 'pending'"
              indeterminate
              size="24"
              width="2"
              color="grey"
              class="mr-2"
            />
            <v-icon
              v-else
              :icon="iconFor(c.status)"
              :color="colorFor(c.status)"
              size="26"
              class="mr-2"
            />
          </template>
          <v-list-item-title class="text-body-1 font-weight-medium">
            {{ c.label }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            <a
              v-if="c.link"
              :href="c.link"
              target="_blank"
              class="text-decoration-none"
              >{{ c.detail }}</a
            >
            <span v-else>{{ c.detail }}</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Collections table -->
    <v-card
      v-if="collections.length"
      variant="outlined"
      class="rounded-xl mb-6"
    >
      <v-card-title class="text-body-1 font-weight-medium pb-0">
        <v-icon
          size="20"
          class="mr-2"
          >mdi-database-outline</v-icon
        >
        Data Stores
      </v-card-title>
      <v-table
        density="compact"
        class="mt-2"
      >
        <thead>
          <tr>
            <th class="text-left">Collection</th>
            <th class="text-center">Local</th>
            <th class="text-center">Remote</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="col in collections"
            :key="col.name"
          >
            <td class="text-body-2">{{ col.name }}</td>
            <td class="text-center">
              <v-icon
                :icon="col.local ? 'mdi-check' : 'mdi-minus'"
                :color="col.local ? 'success' : 'grey'"
                size="20"
              />
            </td>
            <td class="text-center">
              <v-icon
                :icon="col.remote ? 'mdi-check' : 'mdi-minus'"
                :color="col.remote ? 'success' : 'grey'"
                size="20"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Interactive reactivity test -->
    <v-card
      variant="outlined"
      class="rounded-xl mb-6"
    >
      <v-card-title class="text-body-1 font-weight-medium pb-0">
        <v-icon
          size="20"
          class="mr-2"
          >mdi-flask-outline</v-icon
        >
        Interactive Reactivity Test
      </v-card-title>
      <v-card-text>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Click the button to write a value into the Pinia store and verify the
          computed property updates in real time.
        </p>

        <div class="d-flex align-center ga-3 mb-4">
          <v-btn
            color="primary"
            variant="tonal"
            rounded="lg"
            :loading="reactivity.running"
            @click="runReactivityTest"
          >
            <v-icon start>mdi-play</v-icon>
            Run Test
          </v-btn>

          <v-chip
            v-if="reactivity.result"
            :color="reactivity.result === 'pass' ? 'success' : 'error'"
            variant="tonal"
            size="small"
          >
            <v-icon
              start
              size="16"
            >
              {{ reactivity.result === "pass" ? "mdi-check" : "mdi-close" }}
            </v-icon>
            {{ reactivity.result === "pass" ? "Reactive" : "Not reactive" }}
          </v-chip>
        </div>

        <v-expand-transition>
          <div v-if="reactivity.log.length">
            <v-divider class="mb-3" />
            <div
              v-for="(line, j) in reactivity.log"
              :key="j"
              class="text-caption font-weight-regular text-medium-emphasis d-flex align-center ga-2 mb-1"
            >
              <v-icon
                :icon="line.ok ? 'mdi-check-circle' : 'mdi-information'"
                :color="line.ok ? 'success' : 'info'"
                size="14"
              />
              {{ line.text }}
            </div>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>

    <div class="d-flex align-center justify-center ga-3">
      <v-btn
        variant="tonal"
        size="small"
        rounded="lg"
        :loading="rechecking"
        @click="recheck"
      >
        <v-icon
          start
          size="16"
          >mdi-refresh</v-icon
        >
        Re-check
      </v-btn>
      <span class="text-caption text-medium-emphasis">
        {{ lastChecked }}
      </span>
    </div>
  </v-container>
</template>

<script setup>
import { useRepo } from "pinia-orm";
import { Model } from "pinia-orm";

const checks = ref([
  { label: "Pinia ORM", status: "pending", detail: "Checking\u2026" },
  { label: "PocketBase", status: "pending", detail: "Checking\u2026" },
]);

const collections = ref([]);

const done = computed(() => checks.value.every((c) => c.status !== "pending"));
const allOk = computed(
  () => done.value && checks.value.every((c) => c.status === "ok"),
);
const hasFail = computed(() => checks.value.some((c) => c.status === "fail"));

const lastChecked = ref("\u2014");
const rechecking = ref(false);

const reactivity = ref({ running: false, result: null, log: [] });

function iconFor(s) {
  return {
    ok: "mdi-check-circle",
    fail: "mdi-close-circle",
    warn: "mdi-alert-circle",
  }[s];
}
function colorFor(s) {
  return { ok: "success", fail: "error", warn: "warning" }[s];
}
function set(i, status, detail, link) {
  checks.value[i] = { ...checks.value[i], status, detail, link };
}

function discoverStores() {
  const pinia = usePinia();
  const storeIds = [...pinia._s.keys()];
  const ormStores = storeIds.filter((id) => {
    const s = pinia._s.get(id);
    return (
      s &&
      typeof s.data === "object" &&
      s.data !== null &&
      typeof s.save === "function"
    );
  });
  return ormStores;
}

async function runChecks() {
  checks.value = checks.value.map((c) => ({
    ...c,
    status: "pending",
    detail: "Checking\u2026",
    link: undefined,
  }));
  collections.value = [];

  // 1 — Pinia ORM stores
  try {
    const stores = discoverStores();
    if (stores.length > 0) {
      set(
        0,
        "ok",
        `${stores.length} store${stores.length > 1 ? "s" : ""} registered`,
      );
    } else {
      set(0, "warn", "No ORM stores found \u2014 sync a collection first");
    }
  } catch (e) {
    set(0, "fail", e.message);
  }

  // 2 — PocketBase connection
  let pbOnline = false;
  try {
    const pb = usePocketBase();
    await pb.health.check();
    pbOnline = true;
    const adminUrl = `${pb.baseURL}/_/`;
    set(1, "ok", `Healthy \u2014 ${adminUrl}`, adminUrl);
  } catch (e) {
    set(1, "fail", `Unreachable \u2014 is PocketBase running?`);
  }

  // 3 — Collections table
  const stores = discoverStores();
  const rows = [];
  for (const id of stores) {
    const s = usePinia()._s.get(id);
    const hasLocal = Object.keys(s.data).length > 0;
    let hasRemote = false;
    if (pbOnline) {
      try {
        const pb = usePocketBase();
        await pb.collection(id).getList(1, 1);
        hasRemote = true;
      } catch {}
    }
    rows.push({ name: id, local: hasLocal, remote: hasRemote });
  }
  collections.value = rows;

  lastChecked.value = new Date().toLocaleTimeString();
}

async function recheck() {
  rechecking.value = true;
  await runChecks();
  rechecking.value = false;
}

onMounted(runChecks);

async function runReactivityTest() {
  reactivity.value = { running: true, result: null, log: [] };
  const log = (text, ok = true) => reactivity.value.log.push({ text, ok });

  try {
    const stores = discoverStores();
    if (!stores.length) {
      log("No ORM stores found \u2014 cannot test", false);
      reactivity.value.running = false;
      reactivity.value.result = "fail";
      return;
    }

    const storeId = stores[0];
    const pinia = usePinia();
    const store = pinia._s.get(storeId);
    log(`Using store "${storeId}"`);

    const testId = `__status_test_${Date.now()}`;
    const testRecord = { id: testId, __test: true };

    // Write to store
    store.save({ [testId]: testRecord });
    log(`Wrote test record ${testId} to store.data`);

    // Check if it's there
    await nextTick();
    const found = !!store.data[testId];
    log(`Record in store.data: ${found}`, found);

    // Clean up
    const { [testId]: _, ...rest } = store.data;
    store.data = rest;
    await nextTick();
    const gone = !store.data[testId];
    log(`Cleaned up test record: ${gone}`, gone);

    reactivity.value.result = found && gone ? "pass" : "fail";
  } catch (e) {
    log(`Error: ${e.message}`, false);
    reactivity.value.result = "fail";
  } finally {
    reactivity.value.running = false;
  }
}
</script>
