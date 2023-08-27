<template>
  <a-modal
    v-model:visible="visible"
    :closable="isClosable"
    :width="width"
    :top="top"
    title-align="start"
    :draggable="isDraggable"
    :fullscreen="isFullScreen"
    :footer="false"
    @close="handleClose"
    @open="handleOpen"
  >
    <template #title>
      <div class="container-header">
        <p>{{ title }}</p>
      </div>
    </template>

    <div class="container-body">
      <slot></slot>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const visible = ref(false);
  const props = defineProps({
    title: {
      type: String,
      default: '添加',
    },
    width: {
      type: Number,
      default: 1080,
    },
    top: Number,
    isClosable: {
      type: Boolean,
      default: true,
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
  });

  const handleClose = () => {
    visible.value = false;
  };

  const handleOpen = () => {
    visible.value = true;
  };

  defineExpose({
    handleOpen,
    handleClose,
    props,
  });
</script>

<style scoped lang="less">
  .container-header {
    text-align: left;
  }
</style>
