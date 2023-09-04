<template>
  <YModal ref="yModal" :title="$t('menu.ykgl.tkgl.add')" :width="550">
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
          <a-col>
            <a-form-item>
              <a-button type="primary">{{
                $t('groupForm.form.answer.add')
              }}</a-button>
            </a-form-item>
          </a-col>

          <a-col>
            <a-table
              :columns="columns"
              :data="questionAnswers"
              style="margin-top: 20px"
            >
              <template #name="{ record }">
                <a-input v-model="record.name" />
              </template>

              <template #city="{ record }">
                <a-select
                  v-model="record.city"
                  :options="options[record.province] || []"
                />
              </template>
            </a-table>
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

  const questionAnswers = reactive<QuestionAnswerDtos[]>([]);

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

  const columns = [
    {
      title: t('groupForm.form.answer.code'),
      dataIndex: 'answerCode',
    },
    {
      title: t('groupForm.form.answer.image'),
      dataIndex: 'attachmentFiles',
    },
    {
      title: t('groupForm.form.answer.content'),
      dataIndex: 'answerContent',
    },
    {
      title: t('groupForm.form.answer.nrjx'),
      dataIndex: 'dzjx',
    },
    {
      title: t('groupForm.form.answer.sfwda'),
      dataIndex: 'isRightResult',
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
</style>
