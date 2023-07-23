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
        :data="data"
        :size="size"
        :scrollbar="true"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>

        <template #status="{ record }">
          <span v-if="record.status === 0" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
        </template>

        <template #operations>
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
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
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
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.index'),
      dataIndex: 'index',
    },
    {
      title: t('searchTable.columns.menuId'),
      dataIndex: 'menuId',
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
      title: t('searchTable.columns.menuIsVisable'),
      dataIndex: 'menuIsVisable',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.status.online'),
      value: 'online',
    },
    {
      label: t('searchTable.form.status.offline'),
      value: 'offline',
    },
  ]);
  const data = reactive([
    {
      index: '1',
      menuId: '管理员',
      menuName: 0,
      menuIcon: 0,
      menuUrl: '管理员',
      menuPath: '管理员',
      menuIsVisable: '管理员',
      menuIsFrame: '管理员',
      menuParent: '管理员',
      menuSort: '管理员',
      menuComponent: '管理员',
      createdTime: '管理员',
      status: '管理员',
      children: [
        {
          index: '2',
          menuId: '管理员',
          menuName: 0,
          menuIcon: 0,
          menuUrl: '管理员',
          menuPath: '管理员',
          menuIsVisable: '管理员',
          menuIsFrame: '管理员',
          menuParent: '管理员',
          menuSort: '管理员',
          menuComponent: '管理员',
          createdTime: '管理员',
          status: '管理员',
        },
        {
          index: '3',
          menuId: '管理员',
          menuName: 0,
          menuIcon: 0,
          menuUrl: '管理员',
          menuPath: '管理员',
          menuIsVisable: '管理员',
          menuIsFrame: '管理员',
          menuParent: '管理员',
          menuSort: '管理员',
          menuComponent: '管理员',
          createdTime: '管理员',
          status: '管理员',
        },
      ],
    },
    {
      index: '4',
      menuId: '管理员',
      menuName: 0,
      menuIcon: 0,
      menuUrl: '管理员',
      menuPath: '管理员',
      menuIsVisable: '管理员',
      menuIsFrame: '管理员',
      menuParent: '管理员',
      menuSort: '管理员',
      menuComponent: '管理员',
      createdTime: '管理员',
      status: '管理员',
    },
  ]);

  const scroll = {
    x: 4000,
    y: 300,
  };

  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      pagination.current = params.current;
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
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
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
