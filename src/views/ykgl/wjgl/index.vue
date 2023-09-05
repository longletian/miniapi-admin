<template>
  <div class="container">
    <Breadcrumb :items="['menu.ykgl', 'menu.ykgl.wjgl']" />
    <a-card class="general-card" :title="$t('menu.ykgl.wjgl')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="keyWord"
                  :label="$t('searchTable.form.questionnaire.keyWord')"
                >
                  <a-input
                    v-model="formModel.keyWord"
                    :placeholder="
                      $t('searchTable.form.questionnaire.keyWord.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="typeId"
                  :label="$t('groupForm.form.typeName')"
                >
                  <a-select
                    v-model="formModel.typeId"
                    :options="questionnaireOptions"
                    allow-clear
                    :field-names="{ value: 'code', label: 'name' }"
                    :placeholder="$t('groupForm.form.typeName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('searchTable.form.username')"
                >
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="$t('searchTable.form.username.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('searchTable.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="changeComponent('addWj')">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-button
              type="primary"
              status="success"
              @click="changeComponent('editWj')"
            >
              <template #icon>
                <icon-edit />
              </template>
              {{ $t('searchTable.operation.edit') }}
            </a-button>
            <a-button
              type="primary"
              status="danger"
              @click="changeComponent('delete')"
            >
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('searchTable.operation.delete') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="item in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKeys"
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :column-resizable="true"
        :row-selection="rowSelection"
        :bordered="false"
        :size="size"
        @select="onSelectEvent"
        @select-all="onSelectAllEvent"
        @selection-change="onSelectChange"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.page - 1) * pagination.pageSize }}
        </template>
        <template #operations>
          <a-button type="text" size="small">
            {{ $t('searchTable.columns.operations.view') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>

  <component :is="addWj" ref="addWjRef"></component>
  <component :is="editWj" ref="editWjRef"></component>
</template>

<script lang="ts" setup>
  import {
    computed,
    ref,
    reactive,
    watch,
    nextTick,
    markRaw,
    shallowRef,
    onMounted,
    getCurrentInstance,
  } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { WjglListData, WjglSearchParams } from '@/api/ykgl/wjgl/type';
  import { getPageWjListData } from '@/api/ykgl/wjgl/wjgl';
  import addWj from './components/add.vue';
  import editWj from './components/edit.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      userName: '',
      keyWord: '',
      startTime: '',
      createdTime: [],
      endTime: '',
      typeId: undefined,
      isAutoQuestionnaire: null,
    };
  };

  const questionnaireOptions = computed(() => [
    {
      code: '1',
      name: '问卷类型1',
    },
    {
      code: '2',
      name: '问卷类型2',
    },
    {
      code: '3',
      name: '问卷类型3',
    },
  ]);
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();

  const modalTitle = ref('');
  const renderData = ref<WjglListData[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const selectedKeys = ref([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    page: 1,
    pageSize: 5,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const rowSelection: TableRowSelection = {
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  };

  const densityList = computed(() => [
    {
      name: t('searchTable.size.mini'),
      value: 'mini',
    },
    {
      name: t('searchTable.size.small'),
      value: 'small',
    },
    {
      name: t('searchTable.size.medium'),
      value: 'medium',
    },
    {
      name: t('searchTable.size.large'),
      value: 'large',
    },
  ]);

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.id'),
      dataIndex: 'id',
    },

    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name',
    },

    {
      title: t('searchTable.columns.typeName'),
      dataIndex: 'typeName',
    },
    // {
    //   title: t('searchTable.columns.Description'),
    //   dataIndex: 'Description',
    // },
    {
      title: t('searchTable.columns.yxqStime'),
      dataIndex: 'yxqStime',
    },
    {
      title: t('searchTable.columns.yxqEtime'),
      dataIndex: 'yxqEtime',
    },
    {
      title: t('searchTable.columns.fullScore'),
      dataIndex: 'fullScore',
    },
    {
      title: t('searchTable.columns.isPublished'),
      dataIndex: 'isPublished',
    },
    {
      title: t('searchTable.columns.createTime'),
      dataIndex: 'createTime',
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);

  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.status.0'),
      value: '正常',
    },
    {
      label: t('searchTable.form.status.1'),
      value: '停用',
    },
  ]);

  const fetchData = async (
    params: WjglSearchParams = { page: 1, pageSize: 5 }
  ) => {
    setLoading(true);
    try {
      const { data } = await getPageWjListData(params);
      renderData.value = data.items;
      pagination.page = data.totalPages;
      pagination.total = data.totalCount;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as WjglSearchParams);
  };

  const onPageChange = (page: number) => {
    basePagination.page = page;
    search();
  };

  fetchData();

  const reset = () => {
    formModel.value = generateFormModel();
  };

  const onSelectEvent = (keys, rowKey, record) => {
    console.log(`${keys}--${rowKey}${JSON.stringify(record)}`);
  };

  const onSelectAllEvent = (keys) => {
    console.log(keys);
  };

  const onSelectChange = (rowKeys) => {
    console.log(rowKeys);
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );

  const componentCheck = shallowRef(null);
  const currentInstance = getCurrentInstance();
  const changeComponent = function changeComponent(val) {
    if (val) {
      if (val === 'addWj') {
        currentInstance.ctx.$refs.addWjRef.onHandleOpen();
      } else if (val === 'editWj') {
        currentInstance.ctx.$refs.editWjRef.onHandleOpen();
      }
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
