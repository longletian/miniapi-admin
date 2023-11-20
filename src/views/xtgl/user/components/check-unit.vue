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
              field="keyWord"
            >
              <a-input-search
                :placeholder="$t('searchTable.form.keyWord.placeholder')"
                search-button="true"
                @search="onSearch"
              >
                <template #button-icon>
                  <icon-search />
                </template>
                <template #button-default> </template>
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
          key: 'value',
          title: 'label',
          children: 'items'
        }"
        :default-value="treeData[0]"
        :model-value="from.unitId"
        allow-clear
        :data="treeData"
        style="width: 100%"
      >
      </a-tree-select>
    </div>
  </YModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';

  const empty = ref();
  const from = reactive({
    unitId: undefined,
    unitName: ''
  });
  const keyWord = ref();
  const treeData = [
    {
      label: '旺旺集团',
      value: '0',
      items: [
        {
          label: '旺旺集团-开发部',
          value: '0-0-2',
          items: [
            {
              label: '旺旺集团-开发部-后台',
              value: '0-0-2-1'
            }
          ]
        },
        {
          label: '旺旺集团-销售部',
          value: '0-1',
          items: [
            {
              label: '旺旺集团-销售部-售前',
              value: '0-1-1',
              items: [
                {
                  label: 'Leaf',
                  value: '0-1-1-0'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const onSearch = () => {};

  const computedTreeData1 = computed(() => {
    return empty.value ? [] : treeData;
  });

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
