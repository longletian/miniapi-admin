<template>
  <div class="container">
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
          <p> {{ title }}</p>
        </div>
      </template>

      <div class="container-body">
        <slot></slot>
      </div> </a-modal
  ></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, defineEmits } from 'vue';

  const visible = ref(false);
  const props = defineProps({
    title: {
      type: String,
      default: '新增',
    },
    width: {
      type: Number,
      default: 500,
    },
    top: {
      type: Number,
      default: 0,
    },
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
    footer: {
      type: Boolean,
      default: false,
    },
  });

  const handleClose = () => {
    visible.value = false;
  };

  const handleOpen = () => {
    console.log(props.title);
    visible.value = true;
  };

  defineExpose({
    handleOpen,
    handleClose,
  });
</script>

<style scoped lang="less">
  .container-header {
    text-align: left;
  }
  .container-body {
    // width: calc(100% - 20px);
  }
</style>
