```json
 "scripts": {
    // ...
    "pb-sync": "node --env-file=.env -e 'import(\"./nuxt-base/pb/cli/pb-sync.js\").then( loadedModule => loadedModule.syncPocketBaseCollection(process.argv[1]) )'",
    // ...
 }
```

```sh
# sync pb collection
pnpm run pb-sync contact_users
```

Usage:

**Important:** PocketBase queries are async operations. Do not use `computed` with async functions as it will return a Promise object.

**Recommended approach (with SSR support):**

```ts
<script setup>
const pb = usePocketBase();

const { data: products } = await useAsyncData('products', async () => {
  return await pb.collection("products").getList(1, 100, {
    sort: "createdAt",
  });
});
</script>
```

**Alternative (client-side only):**

```ts
<script setup>
const pb = usePocketBase();

const products = ref(null);

onMounted(async () => {
  products.value = await pb.collection("products").getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00"',
  });
});

</script>
```

**If you need to derive computed values from fetched data:**

```ts
<script setup>
const pb = usePocketBase();

const { data: expenses } = await useAsyncData('expenses', async () => {
  return await pb.collection("expenses").getList(1, 100, {
    sort: "createdAt",
  });
});

// Now you can use computed for synchronous transformations
const totalExpenses = computed(() => {
  return expenses.value?.items?.reduce((sum, item) => sum + item.amount, 0) || 0;
});
</script>
```
