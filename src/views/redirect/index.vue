<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  debugger;

  const gotoPath = route.params.path as string;

  console.log(gotoPath);

  router.replace({ path: gotoPath });
</script>

<style scoped lang="less"></style>
