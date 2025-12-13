<template>
  <div>
    <button @click="update">UserData.count ++</button>
    <pre>UserData: {{ userData }}</pre>
  </div>
</template>

<script setup>
import UserData from "@/models/UserData";

const userData = computed(() => {
  return useRepo(UserData).find(1);
});

onMounted(() => {
  useRepo(UserData).save({ id: 1 });
});

const count = ref(1);

const update = () => {
  count.value++;
  useRepo(UserData).save({ id: 1, count: count.value });
};
</script>
