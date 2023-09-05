<template>
  <YModal ref="yModal" :title="$t('menu.ykgl.wjgl.add')" :width="550">
    <a-form ref="formRef" direction="horizontal" :model="formData">
      <a-space direction="horizontal" :size="24">
        <a-row>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.questionnaireName')"
              field="formData.questionnaireName"
            >
              <a-input
                v-model="formData.name"
                :placeholder="
                  $t('groupForm.form.questionnaireName.placeholder')
                "
              >
              </a-input>
            </a-form-item>
          </a-col>

          <a-col>
            <a-form-item
              :label="$t('groupForm.form.typeName')"
              field="formData.typeName"
            >
              <a-select
                v-model="formData.typeName"
                :options="questionnaireOptions"
                allow-clear
                :field-names="{ value: 'code', label: 'name' }"
                :placeholder="$t('groupForm.form.typeName.placeholder')"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.fullScore')"
              field="formData.fullScore"
            >
              <a-input-number
                v-model="formData.fullScore"
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
              :label="$t('groupForm.form.yxStime')"
              field="formData.yxStime"
            >
              <a-range-picker
                v-model="rangeValue"
                @change="onChange"
                @select="onSelect"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.isRandomGenerate')"
              field="formData.isRandomGenerate"
            >
              <a-radio-group>
                <a-radio v-model="formData.isRandomGenerate" value="0">{{
                  $t('groupForm.form.isRandomGenerate.0')
                }}</a-radio>
                <a-radio v-model="formData.isRandomGenerate" value="1">{{
                  $t('groupForm.form.isRandomGenerate.1')
                }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.isPublished')"
              field="formData.isPublished"
            >
              <a-radio-group>
                <a-radio v-model="formData.isPublished" value="1">{{
                  $t('groupForm.form.isPublished.1')
                }}</a-radio>
                <a-radio v-model="formData.isPublished" value="0">{{
                  $t('groupForm.form.isPublished.0')
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
            {{ $t('groupForm.from.cancle') }}
          </a-button>
        </a-space>
      </div>
    </a-form>
  </YModal>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import { AddQuestionnaireDto, QuestionDto } from './types/questionnaire';

  const rangeValue = ref([]);

  const defaultChecked = ref(true);

  const formData = reactive<AddQuestionnaireDto>({
    name: '',
    fullScore: undefined,
    typeId: undefined,
    typeName: '',
    description: '',
    isRandomGenerate: undefined,
    isPublished: undefined,
    yxqStime: undefined,
    yxqEtime: undefined,
    questionDtos: [],
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

  const onChange = () => {};

  const onSelect = () => {};

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
