<template>
  <YModal ref="yModal" :title="$t('menu.xtgl.dept.add')" :width="500">
    <div class="container">
      <a-form ref="formRef" direction="horizontal" :model="formData">
        <a-space direction="horizontal">
          <a-row :span="24">
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.parentId')"
                field="formData.parentId"
              >
                <a-tree-select
                  :placeholder="$t('groupForm.form.parentId.placeholder')"
                  :field-names="{
                    key: 'id',
                    title: 'unitName',
                    children: 'children',
                  }"
                  :label-in-value="true"
                  :data="treeData"
                  :allow-search="true"
                  :allow-clear="true"
                  :v-model="formData.parentId"
                >
                </a-tree-select>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.unitName')"
                field="formData.unitName"
              >
                <a-input
                  v-model="formData.unitName"
                  allow-clear
                  :placeholder="$t('groupForm.form.unitName.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.unitTypeId')"
                field="formData.unitTypeId"
              >
                <a-select
                  :key="index"
                  v-model="formData.unitTypeId"
                  allow-clear
                  :placeholder="$t('groupForm.form.unitTypeId.placeholder')"
                >
                  <a-option
                    v-for="(item, index) in unitTypeOptions"
                    :key="index"
                    :value="item.code"
                    :label="item.name"
                  ></a-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.sortNum')"
                field="formData.sortNum"
              >
                <a-input-number
                  v-model="formData.sortNum"
                  min="0"
                  allow-clear
                  :default-value="0"
                  mode="button"
                >
                </a-input-number>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.description')"
                field="formData.description"
              >
                <a-textarea
                  v-model="formData.description"
                  :placeholder="$t('groupForm.form.description.placeholder')"
                  allow-clear
                  max-length="100"
                />
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.status')"
                field="formData.status"
              >
                <a-radio-group
                  v-model="formData.status"
                  @change="onGenderChange"
                >
                  <a-radio :value="0">{{
                    $t('searchTable.form.status.0')
                  }}</a-radio>
                  <a-radio :value="1">{{
                    $t('searchTable.form.status.1')
                  }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-space>
        <div class="btn-group">
          <a-space :size="24">
            <a-button type="primary" :loading="loading" @click="onConfirm">
              {{ $t('groupForm.from.submit') }}
            </a-button>
            <a-button>
              {{ $t('groupForm.from.cancel') }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </YModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, computed, onBeforeMount } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { DeptTreeSeachDto, AddDeptInput } from '@/api/xtgl/dept/type';
  import useXtglStore from '@/store/modules/xtgl/index';

  const { t } = useI18n();

  const formData = reactive<AddDeptInput>({
    parentId: undefined,
    unitTypeId: undefined,
    unitName: '',
    description: '',
    sortNum: undefined,
    status: undefined,
  });

  const useCommonStore = useXtglStore.useCommonStore();
  const useDeptStore = useXtglStore.useDeptStore();

  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();
  const deptTreeSeachDto: DeptTreeSeachDto = {};

  onMounted(() => {
    useDeptStore.getDeptTreeData(deptTreeSeachDto);

    useCommonStore.getDictListData('Unit_Type');
  });

  const treeData = computed(() => useDeptStore.treeInfo);

  const unitTypeOptions = computed(() => useCommonStore.getDictList);

  const onConfirm = async () => {
    const res = await useDeptStore.postDeptData(formData);
    console.log(`添加部门${res.data}`);
  };

  const yModal = ref();
  const onHandleOpen = () => {
    yModal.value.handleOpen();
  };

  defineExpose({ onHandleOpen });
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }
</style>
