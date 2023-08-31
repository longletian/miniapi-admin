<template>
  <YModal ref="yModal" :title="$t('menu.xtgl.user.add')">
    <div class="container">
      <a-form ref="formRef" direction="horizontal" :model="formData">
        <a-space direction="horizontal">
          <a-row :gutter="80">
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.name')"
                field="formData.name"
              >
                <a-input
                  v-model="formData.name"
                  :placeholder="$t('groupForm.form.name.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.unitId')"
                field="formData.unitId"
              >
                <a-input-search
                  :placeholder="$t('groupForm.form.unitId.placeholder')"
                  search-button="true"
                  @focus="onUnitSearch"
                  @search="onUnitSearch"
                >
                  <template #button-icon>
                    <icon-search />
                  </template>
                  <template #button-default> </template>
                </a-input-search>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.passWord')"
                field="formData.passWord"
              >
                <a-input-password
                  v-model="formData.passWord"
                  :placeholder="$t('groupForm.form.passWord.placeholder')"
                >
                </a-input-password>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.confirmPassWord')"
                field="formData.confirmPassWord"
              >
                <a-input-password
                  v-model="formData.confirmPassWord"
                  :placeholder="
                    $t('groupForm.form.confirmPassWord.placeholder')
                  "
                >
                </a-input-password>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.nickName')"
                field="formData.nickName"
              >
                <a-input
                  v-model="formData.nickName"
                  :placeholder="$t('groupForm.form.nickName.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.gender')"
                field="formData.gender"
              >
                <a-select
                  :key="index"
                  v-model="formData.gender"
                  allow-clear
                  :placeholder="$t('groupForm.form.gender.placeholder')"
                >
                  <a-option
                    v-for="(item, index) in genderOptions"
                    :key="index"
                    :value="item.code"
                    :label="item.name"
                  ></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.email')"
                field="formData.email"
              >
                <a-input
                  v-model="formData.email"
                  :placeholder="$t('groupForm.form.email.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.telePhone')"
                field="formData.telePhone"
              >
                <a-input
                  v-model="formData.telePhone"
                  :placeholder="$t('groupForm.form.telePhone.placeholder')"
                >
                </a-input>
              </a-form-item>
            </a-col>

            <a-col>
              <a-form-item
                :label="$t('groupForm.form.roleIds')"
                field="formData.roleIds"
              >
                <a-select
                  :key="index"
                  v-model="formData.roleIds"
                  allow-clear
                  multiple
                  :max-tag-count="3"
                  :placeholder="$t('groupForm.form.roleIds.placeholder')"
                >
                  <a-option
                    v-for="(item, index) in options"
                    :key="index"
                    :value="item.code"
                    :label="item.name"
                  ></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col>
              <a-form-item
                :label="$t('groupForm.form.postIds')"
                field="formData.postIds"
              >
                <a-select
                  :key="index"
                  v-model="formData.postIds"
                  allow-clear
                  multiple
                  :max-tag-count="3"
                  :placeholder="$t('groupForm.form.postIds.placeholder')"
                >
                  <a-option
                    v-for="(item, index) in options"
                    :key="index"
                    :value="item.code"
                    :label="item.name"
                  ></a-option>
                </a-select>
              </a-form-item>
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
  <checkUnit ref="checkUnitRef"></checkUnit>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import checkUnit from './check-unit.vue';

  const { t } = useI18n();

  const formData = reactive({
    name: '',
    nickName: '',
    description: '',
    unitId: undefined,
    unitName: '',
    passWord: '',
    confirmPassWord: '',
    gender: undefined,
    telePhone: '',
    email: '',
    sortNum: undefined,
    status: undefined,
    roleIds: [],
    postIds: [],
  });
  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();
  const options = [
    {
      code: '1',
      name: '角色1',
    },
    {
      code: '2',
      name: '角色2',
    },
  ];

  const genderOptions = [
    {
      code: 0,
      name: t('groupForm.form.gender.0'),
    },
    {
      code: 1,
      name: t('groupForm.form.gender.1'),
    },
    {
      code: 2,
      name: t('groupForm.form.gender.2'),
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

  const checkUnitRef = ref();
  const onUnitSearch = () => {
    checkUnitRef.value.onHandleOpen();
  };

  defineExpose({ onHandleOpen });
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }
</style>
