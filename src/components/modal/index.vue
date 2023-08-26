<template>
  <a-modal
    v-model:visible="visible"
    :title="props.title"
    :title-align="props.titleAlign"
    :closable="props.isClosable"
    :width="props.width"
    :top="props.top"
    :draggable="props.isDraggable"
    :fullscreen="props.isFullScreen"
    @close="handleClose"
    @open="handleOpen"
  >
    <slot></slot>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ModalProps } from './type';

  const visible = ref(false);
  const props = defineProps<ModalProps>();

  onMounted(() => {
    console.log('');
  });

  const emits = defineEmits(['closed', '']);
  const handleClose = () => {
    visible.value = false;
    emits('closed');
  };

  const handleOpen = () => {
    visible.value = true;
  };
</script>

<style scoped></style>
