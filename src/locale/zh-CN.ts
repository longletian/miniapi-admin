import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localUser from '@/views/xtgl/user/locale/zh-CN';
import localRole from '@/views/xtgl/role/locale/zh-CN';
import localPost from '@/views/xtgl/post/locale/zh-CN';
import localDept from '@/views/xtgl/dept/locale/zh-CN';
import localMenu from '@/views/xtgl/menu/locale/zh-CN';
import localDict from '@/views/xtgl/dict/locale/zh-CN';
import localLogAction from '@/views/xtgl/log/action/locale/zh-CN';
import localLogLogin from '@/views/xtgl/log/login/locale/zh-CN';
import localeLogin from '@/views/xtgl/login/locale/zh-CN';

import localFjgl from '@/views/cggl/fjgl/locale/zh-CN';
import localGrzl from '@/views/cggl/grzl/locale/zh-CN';
import localXtpz from '@/views/cggl/xtpz/locale/zh-CN';
import localMessageBox from '@/components/message-box/locale/zh-CN';

import localWjgl from '@/views/ykgl/wjgl/locale/zh-CN';
import localTkgl from '@/views/ykgl/tkgl/locale/zh-CN';
import localJcls from '@/views/ykgl/jcls/locale/zh-CN';

import localeSettings from './zh-CN/settings';
import localCommon from './zh-CN/common';

export default {
  'menu.dashboard': '仪表盘',
  'menu.xtgl': '系统管理',
  'menu.cggl': '常规管理',
  'menu.sjksh': '报表管理',
  'menu.xtgl.log': '日志管理',
  'menu.ykgl': '医考管理',
  'menu.yygl': '医药管理',

  // 'menu.server.dashboard': '仪表盘-服务端',
  // 'menu.server.workplace': '工作台-服务端',
  // 'menu.server.monitor': '实时监控-服务端',
  // 'menu.list': '列表页',
  // 'menu.result': '结果页',
  // 'menu.exception': '异常页',
  // 'menu.form': '表单页',
  // 'menu.profile': '详情页',
  // 'menu.visualization': '数据可视化',
  // 'menu.user': '个人中心',
  // 'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeLogin,
  ...localeWorkplace,
  ...localMessageBox,
  ...localeMonitor,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeUserInfo,
  ...localeUserSetting,
  ...localUser,
  ...localRole,
  ...localPost,
  ...localDict,
  ...localMenu,
  ...localDept,
  ...localLogAction,
  ...localLogLogin,
  ...localFjgl,
  ...localGrzl,
  ...localXtpz,
  ...localWjgl,
  ...localTkgl,
  ...localJcls,
  ...localCommon,
};
