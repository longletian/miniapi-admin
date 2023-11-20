<template>
  <YModal ref="yModal" :title="$t('menu.ykgl.wjgl.add')" :width="800">
    <a-steps
      changeable
      type="vertical"
      :current="current"
      style="padding-left: 60px"
      label-placement="vertical"
      @change="setCurrent"
    >
      <a-step>问卷名称</a-step>
      <a-step>题目设置 </a-step>
    </a-steps>
    <a-divider />
    <div v-show="current === 1" class="panel-body">
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
          <a-space direction="horizontal" :size="24">
            <a-button type="primary" @click="onNextConfig">
              {{ $t('groupForm.form.btn.next') }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </div>

    <div v-show="current === 2" class="panel-body">
      <a-space direction="horizontal" :size="24">
        <a-row>
          <a-col>
            <a-button type="primary" @click="onAddQuestion">
              {{ $t('groupForm.form.btn.add.question') }}
            </a-button>
          </a-col>
          <a-col v-for="(item, index) in formData.questionDtos" :key="index">
            <div class="box">
              <p></p>
            </div>
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
    </div>
  </YModal>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import { AddQuestionnaireDto, QuestionDto } from './types/questionnaire';

  const rangeValue = ref([]);

  const current = ref(1);

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

  function setCurrent(value: any) {
    current.value = value;
  }

  const onNextConfig = () => {
    current.value += 1;
  };

  const onAddQuestion = () => {};

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
  .panel-body {
    width: 100%;
    min-height: 500px;
    overflow: auto;
    box-sizing: border-box;
  }
</style>
