<template>
  <YModal
    ref="yModal"
    :title="$t('menu.xtgl.role.config.user')"
    :width="900"
    :top="300"
    :footer="true"
  >
    <div class="body">
      <a-row class="body-header">
        <a-col :span="6"><span>组织架构</span></a-col>
        <a-col :span="12">
          <a-input
            v-model="keyWord"
            :style="{ width: '400px' }"
            allow-clear
            :placeholder="$t('searchTable.form.username.placeholder')"
          />
        </a-col>
        <a-col :span="6"><span>已选人员</span> </a-col>
      </a-row>
      <a-row class="body-content">
        <a-col :span="6">
          <a-tree
            placeholder="请选择"
            :field-names="{
              key: 'value',
              title: 'label',
              children: 'items',
            }"
            :default-value="treeData[0]"
            allow-clear
            :data="treeData"
            style="width: 100%"
          >
          </a-tree>
        </a-col>
        <a-col :span="12">
          <div class="content-box">
            <a-card
              v-for="(item, index) in userList"
              :key="index"
              hoverable
              :style="{ width: '200px', margin: '5px 2px' }"
            >
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }"
              >
                <span
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1D2129',
                  }"
                >
                  <a-avatar
                    :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
                    :size="28"
                  >
                    A
                  </a-avatar>
                  <div>
                    <span>
                      <a-typography-text>{{
                        item.name
                      }}</a-typography-text></span
                    >
                    <span>
                      <a-typography-text>{{
                        item.name
                      }}</a-typography-text></span
                    >
                  </div>
                </span>
              </div>
            </a-card>
          </div>
        </a-col>
        <a-col :span="6">
          <div>
            <div class="content-box">
              <a-card
                v-for="(item, index) in userList"
                :key="index"
                hoverable
                :style="{ width: '200px', margin: '5px 2px' }"
              >
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }"
                >
                  <span
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2129',
                    }"
                  >
                    <a-avatar
                      :style="{
                        marginRight: '8px',
                        backgroundColor: '#165DFF',
                      }"
                      :size="28"
                    >
                      A
                    </a-avatar>
                    <div>
                      <span>
                        <a-typography-text>{{
                          item.name
                        }}</a-typography-text></span
                      >
                      <span>
                        <a-typography-text>{{
                          item.name
                        }}</a-typography-text></span
                      >
                    </div>
                  </span>
                </div>
              </a-card>
            </div></div
          >
        </a-col>
      </a-row>
      <a-row class="body-footer">
        <a-button>{{ $t('groupForm.from.checkAll') }}</a-button>
        <a-button type="primary">{{ $t('groupForm.from.confirm') }}</a-button>
        <a-button>{{ $t('groupForm.from.cancel') }}</a-button>
      </a-row>
    </div>
    <template #footer> heii </template>
  </YModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();

  const yModal = ref();
  const onHandleOpen = () => {
    yModal.value.handleOpen();
  };

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

  const userList = [
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
    { name: 'zhangsna ', age: 12 },
  ];

  const keyWord = ref();

  defineExpose({ onHandleOpen });
</script>

<style scoped lang="less">
  .btn-group {
    margin-top: 30px;
    text-align: right;
  }
  .body {
    height: 600px;
    .body-header {
      height: 40px;
      border: 1px solid #eee;
      padding-left: 10px;
      align-items: center;
      .arco-col {
        color: cornflowerblue;
      }
    }
    .body-content {
      margin-top: 2px;
      border-bottom: 1px solid #eee;
      .arco-col {
        height: 530px;
        overflow-y: auto;
      }
      .arco-col:nth-child(2),
      .arco-col:last-child {
        border-left: 1px solid #eee;
      }
    }
    .content-box {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .body-footer {
      margin-top: 5px;
      display: flex;
      justify-content: flex-end;
      height: 30px;
      align-items: center;
      .arco-btn {
        margin: 0px 10px;
      }
    }
  }
</style>
