<template>
  <YModal
    ref="yModal"
    :title="$t('menu.xtgl.user.checkUnit')"
    :top="1000"
    :width="400"
  >
    <div class="container-header">
      <a-space direction="horizontal">
        <a-row>
          <a-col>
            <a-form-item
              :label="$t('searchTable.form.keyWord')"
              :field="query.unitName"
            >
              <a-input-search
                v-model="query.unitName"
                :placeholder="$t('searchTable.form.keyWord.placeholder')"
                search-button
                @search="onSearch"
              >
                <template #button-icon>
                  <icon-search />
                </template>
                <template #button-default>
                  {{ $t('searchTable.form.search') }}</template
                >
              </a-input-search>
            </a-form-item>
          </a-col>
        </a-row>
      </a-space>
    </div>
    <div class="container-body">
      <a-tree-select
        placeholder="请选择"
        :field-names="{
          key: 'id',
          title: 'unitName',
          children: 'children'
        }"
        :default-value="computedTreeData[0]"
        :model-value="query.unitName"
        :data="computedTreeData"
        allow-clear
        style="width: 100%"
      >
      </a-tree-select>
    </div>
  </YModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { useXtglStore } from '@/store/index';
  import { DeptTreeSeachDto } from '@/api/xtgl/dept/type';

  const deptStore = useXtglStore.useDeptStore();
  const query = reactive<DeptTreeSeachDto>({});
  const onSearch = () => deptStore.getDeptTreeData(query);
  const empty = ref();
  const computedTreeData: any = computed(() => {
    return empty.value ? [] : deptStore.treeInfo;
  });

  const;

  const yModal = ref();
  const onHandleOpen = () => {
    yModal.value.handleOpen();
  };

  defineExpose({
    onHandleOpen
  });
</script>

<style scoped lang="less">
  .container-body {
  }
</style>
