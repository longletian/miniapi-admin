<template>
  <YModal ref="yModal" :title="$t('menu.ykgl.tkgl.add')" :width="650">
    <a-form ref="formRef" direction="horizontal" :width="400" :model="formData">
      <a-space direction="horizontal" :size="24">
        <a-row>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.question_typeName')"
              field="formData.question_typeName"
            >
              <a-select
                v-model="formData.typeName"
                :options="questionTypeOptions"
                allow-clear
                :field-names="{ value: 'code', label: 'name' }"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.categoryTypeName')"
              field="formData.categoryTypeName"
            >
              <a-select
                v-model="formData.categoryTypeName"
                :options="questionTypeOptions"
                :field-names="{ value: 'code', label: 'name' }"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.question_content')"
              field="formData.question_content"
            >
              <a-textarea
                v-model="formData.name"
                :placeholder="$t('groupForm.form.question_content.placeholder')"
                allow-clear
                :max-length="300"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.question_ztjx')"
              field="formData.question_ztjx"
            >
              <a-textarea
                v-model="formData.ztjx"
                :placeholder="$t('groupForm.form.question_ztjx.placeholder')"
                allow-clear
                :max-length="300"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              :label="$t('groupForm.form.question_image')"
              field="formData.question_image"
            >
              <a-upload
                list-type="picture-card"
                action="/"
                :default-file-list="fileList"
                image-preview
              />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="margin-left: 40px">
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('groupForm.form.answer.add') }}</a-button
            >
          </a-col>
          <a-col class="box">
            <div class="box-header">
              <span v-for="(item, index) in selectList" :key="index">
                {{ item.title }}</span
              >
            </div>
            <div class="box-content">
              <a-row v-for="(item, index) in questionAnswers" :key="index">
                <a-input
                  v-model="item.answerCode"
                  :width="100"
                  placeholder=""
                  allow-clear
                />
              </a-row>
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
            {{ $t('groupForm.from.reset') }}
          </a-button>
        </a-space>
      </div>
    </a-form>
  </YModal>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref, reactive, computed } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import { QuestionAddDto, QuestionAnswerDtos } from './types/question';

  const { t } = useI18n();
  const formData = reactive<QuestionAddDto>({
    name: '',
    typeId: undefined,
    typeName: '',
    categoryTypeId: undefined,
    categoryTypeName: '',
    description: '',
    ztjx: '',
    attachmentFiles: [],
    questionAnswerDtos: [],
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

  const questionAnswers = reactive<QuestionAnswerDtos[]>([
    {
      answerCode: '',
      answerContent: '',
      isRightResult: undefined,
      attachmentFiles: [],
      dzjx: '',
    },
    {
      answerCode: '',
      answerContent: '',
      isRightResult: undefined,
      attachmentFiles: [],
      dzjx: '',
    },
  ]);

  const questionTypeOptions = computed(() => {
    return [
      {
        code: 'dxt',
        name: '单选题',
      },
      {
        code: 'morext',
        name: '多选题',
      },
    ];
  });

  const fileList = [
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      uid: '-1',
      name: 'hahhahahahaha.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
  ];

  const selectList = [
    {
      title: t('groupForm.form.answer.code'),
    },
    {
      title: t('groupForm.form.answer.image'),
    },
    {
      title: t('groupForm.form.answer.content'),
    },
    {
      title: t('groupForm.form.answer.nrjx'),
    },
    {
      title: t('groupForm.form.answer.sfwda'),
    },
    {
      title: t('groupForm.form.answer.action'),
    },
  ];

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

  .box {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    .box-header {
      text-align: center;
      align-items: center;
      justify-content: space-around;
      display: flex;
      span {
        display: block;
        width: 100px;
        border: 1px solid #ccc;
      }
    }
    .box-content {
      display: flex;
    }
  }
</style>
