<template>
  <div class="container">
    <a-form ref="formRef" direction="horizontal" :model="formData">
      <a-space direction="horizontal" :size="24">
        <a-row :gutter="80">
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.dictTypeCode')"
              field="formData.dictTypeCode"
            >
              <a-select>
                <option></option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.dictText')"
              field="formData.dictText"
            >
              <a-input
                v-model="formData.dictText"
                :placeholder="$t('groupForm.form.dictText.placeholder')"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.dictValue')"
              field="formData.dictValue"
            >
              <a-input
                v-model="formData.dictValue"
                :placeholder="$t('groupForm.form.dictValue.placeholder')"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.status')"
              field="formData.status"
            >
              <a-radio-group>
                <a-radio v-model="formData.status" value="0">正常</a-radio>
                <a-radio v-model="formData.status" value="1">停用</a-radio>
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
                :max-length="300"
              />
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
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';

  const formData = reactive({
    dictText: '',
    dictValue: '',
    dictTypeCode: '',
    description: '',
    sortNum: undefined,
    status: 0,
  });
  const formRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();

  const onConfirm = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }
</style>
