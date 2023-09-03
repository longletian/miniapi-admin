<template>
  <YModal ref="yModal" :title="$t('menu.xtgl.menu.add')" :width="600">
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
                  placeholder="请选择"
                  :field-names="{
                    key: 'value',
                    title: 'label',
                    children: 'items',
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
                :label="$t('groupForm.form.menuName')"
                field="formData.menuName"
              >
                <a-input
                  v-model="formData.menuName"
                  allow-clear
                  :placeholder="$t('groupForm.form.menuName.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.menuCode')"
                field="formData.menuCode"
              >
                <a-input
                  v-model="formData.menuCode"
                  allow-clear
                  :placeholder="$t('groupForm.form.menuCode.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.category')"
                field="formData.category"
              >
                <a-radio-group>
                  <a-radio v-model="formData.status" value="0">{{
                    $t('groupForm.form.category.0')
                  }}</a-radio>
                  <a-radio v-model="formData.status" value="1">{{
                    $t('groupForm.form.category.1')
                  }}</a-radio>
                  <a-radio v-model="formData.status" value="2">{{
                    $t('groupForm.form.category.2')
                  }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.menuIcon')"
                field="formData.menuIcon"
              >
                <a-input v-model="formData.menuIcon" allow-clear> </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.component')"
                field="formData.component"
              >
                <a-input
                  v-model="formData.component"
                  allow-clear
                  :placeholder="$t('groupForm.form.component.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.menuUrl')"
                field="formData.menuUrl"
              >
                <a-input
                  v-model="formData.menuUrl"
                  allow-clear
                  :placeholder="$t('groupForm.form.menuUrl.placeholder')"
                >
                </a-input>
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
                :label="$t('groupForm.form.visible')"
                field="formData.visible"
              >
                <a-radio-group v-model="formData.visible" allow-clear>
                  <a-radio :value="0">{{
                    $t('groupForm.form.visible.0')
                  }}</a-radio>
                  <a-radio :value="1">{{
                    $t('groupForm.form.visible.1')
                  }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.isFrame')"
                field="formData.isFrame"
              >
                <a-radio-group v-model="formData.isFrame" allow-clear>
                  <a-radio :value="0">{{
                    $t('groupForm.form.isFrame.0')
                  }}</a-radio>
                  <a-radio :value="1">{{
                    $t('groupForm.form.isFrame.1')
                  }}</a-radio>
                </a-radio-group>
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
    parentId: undefined,
    category: undefined,
    menuIcon: '',
    menuName: '',
    menuCode: '',
    component: '',
    menuUrl: '',
    description: '',
    isFrame: undefined,
    visible: undefined,
    sortNum: undefined,
    status: undefined,
  });
  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();
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

  defineExpose({ onHandleOpen });
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }
</style>
