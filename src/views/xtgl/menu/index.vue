<template>
  <div class="container">
    <Breadcrumb :items="['menu.xtgl', 'menu.xtgl.menu']" />
    <a-card class="general-card" :title="$t('menu.xtgl.menu')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item
                  field="menuname"
                  :label="$t('searchTable.form.menuname')"
                >
                  <a-input
                    v-model="formModel.menuName"
                    :placeholder="$t('searchTable.form.menuname.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="status"
                  :label="$t('searchTable.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-space :size="18">
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
          </a-form>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.columns.operations.add') }}
            </a-button>
            <a-button type="primary" status="success">
              <template #icon>
                <icon-edit />
              </template>
              {{ $t('searchTable.columns.operations.edit') }}
            </a-button>
            <a-button type="primary" status="danger">
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('searchTable.columns.operations.delete') }}
            </a-button>
            <a-button>
              <template #icon>
                <icon-to-bottom />
              </template>
              {{ $t('searchTable.columns.operations.showAll') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        :scrollbar="true"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.page - 1) * pagination.pageSize }}
        </template>

        <template #status="{ record }">
          <span v-if="record.status === 0" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
        </template>
        <template #operations>
          <a-button type="text" size="small">
            <template #icon>
              <icon-plus />
            </template>
            <template #default>
              {{ $t('searchTable.columns.operations.setSubPermission') }}
            </template>
          </a-button>
          <a-button type="text" size="small">
            <template #icon>
              <icon-edit />
            </template>
          </a-button>
          <a-button type="text" size="small">
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getPagePermissionListData } from '@/api/xtgl/permission/permission';
  import { Pagination } from '@/types/global';
  import {
    PermissListData,
    PermissionSearchParams,
  } from '@/api/xtgl/permission/type';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      menuName: '',
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PermissListData[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    page: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.id'),
      dataIndex: 'id',
    },
    {
      title: t('searchTable.columns.menuName'),
      dataIndex: 'menuName',
    },
    {
      title: t('searchTable.columns.menuIcon'),
      dataIndex: 'menuIcon',
    },
    {
      title: t('searchTable.columns.menuUrl'),
      dataIndex: 'menuUrl',
    },
    {
      title: t('searchTable.columns.menuPath'),
      dataIndex: 'menuPath',
    },
    {
      title: t('searchTable.columns.component'),
      dataIndex: 'component',
    },
    {
      title: t('searchTable.columns.parentId'),
      dataIndex: 'parentId',
    },
    {
      title: t('searchTable.columns.visible'),
      dataIndex: 'visible',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
    },
    {
      title: t('searchTable.columns.sortNum'),
      dataIndex: 'sortNum',
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

  // const rowSelection: TableRowSelection = {
  //   type: 'checkbox',
  //   showCheckedAll: true,
  //   onlyCurrent: false,
  // };

  const fetchData = async (
    params: PermissionSearchParams = { page: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await getPagePermissionListData(params);
      renderData.value = data.items;
      pagination.page = data.totalPages;
      pagination.total = data.total;
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
    } as unknown as PermissionSearchParams);
  };
  const onPageChange = (current: number) => {
    basePagination.page = current;
    search();
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
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
