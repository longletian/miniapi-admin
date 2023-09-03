<template>
  <YModal ref="yModal" :title="$t('menu.xtgl.role.edit')">
    <div class="container">
      <a-form ref="formRef" direction="horizontal" :model="formData">
        <a-space direction="horizontal">
          <a-row>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.roleName')"
                field="formData.roleName"
              >
                <a-input
                  v-model="formData.roleName"
                  allow-clear
                  :placeholder="$t('groupForm.form.roleName.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.roleCode')"
                field="formData.roleCode"
              >
                <a-input
                  v-model="formData.roleCode"
                  allow-clear
                  :placeholder="$t('groupForm.form.roleCode.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.category')"
                field="formData.category"
              >
                <a-select
                  :key="index"
                  v-model="formData.category"
                  allow-clear
                  :placeholder="$t('groupForm.form.category.placeholder')"
                >
                  <a-option
                    v-for="(item, index) in categoryOptions"
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
                :label="$t('groupForm.form.permission')"
                field="formData.permission"
              >
                <div class="group-container">
                  <div class="col-btn-group">
                    <a-checkbox v-model="checked1">{{
                      $t('groupForm.form.tree.open')
                    }}</a-checkbox>
                    <a-checkbox :model-value="true">
                      {{ $t('groupForm.form.tree.check') }}</a-checkbox
                    >
                    <a-checkbox :model-value="true">
                      {{ $t('groupForm.form.tree.check.parent') }}</a-checkbox
                    >
                  </div>
                  <div class="tree-content">
                    <a-tree
                      v-model:checked-keys="checkedKeys"
                      placeholder="请选择"
                      :field-names="{
                        key: 'value',
                        title: 'label',
                        children: 'items',
                      }"
                      :default-value="treeData[0]"
                      allow-clear
                      multiple="true"
                      :checkable="true"
                      :check-strictly="checkStrictly"
                      :data="treeData"
                      style="width: 100%"
                    >
                    </a-tree>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.status')"
                field="formData.status"
              >
                <a-radio-group v-model="formData.status" allow-clear>
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
              {{ $t('groupForm.from.reset') }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </YModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();

  const formData = reactive({
    roleName: '',
    roleCode: '',
    description: '',
    category: undefined,
    sortNum: undefined,
    status: undefined,
  });
  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();

  const categoryOptions = [
    {
      code: 1,
      name: t('groupForm.form.category.1'),
    },
    {
      code: 2,
      name: t('groupForm.form.category.2'),
    },
  ];

  const onConfirm = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const yModal = ref();
  const onHandleOpen = () => {
    yModal.value.handleOpen();
  };

  const checkedKeys = ref([]);
  const checkStrictly = ref(false);
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
              value: '0-0-2-1',
            },
          ],
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
                  value: '0-1-1-0',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  defineExpose({ onHandleOpen });
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }

  .group-container {
    width: 100%;
    .col-btn-group {
      display: flex;
      justify-content: space-around;
      .arco-checkbox {
        margin: 0px 10px;
      }
    }
    .tree-content {
      padding: 5px 0px;
    }
  }
</style>
