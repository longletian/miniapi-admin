import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/workplace/mock';

import '@/views/dashboard/monitor/mock';

import '@/views/cggl/grzl/mock';

import '@/views/visualization/data-analysis/mock';
import '@/views/visualization/multi-dimension-data-analysis/mock';

import '@/views/user/info/mock';
import '@/views/user/setting/mock';

Mock.setup({
  timeout: '600-1000',
});
