const BASE = {
  ADD: '_add',
  DELETE: '_delete',
  EDIT: '_edit',
  INFO: '_info',
  LIST: '_list',
};

const COMMON = {
  LOGIN: '/user/login',
  VERIFICATIONCODE: '',
};

const USER = {
  ROOT: '/user',
};

const ROLE = {
  ROOT: '/role',
};

const PERMISSION = {
  ROOT: '/permission',
};

const DEPT = {
  ROOT: '/unit',
};

const DICT = {
  ROOT: '/dict',
  TYPE_ROOT: '/dict/type',
};

const LOG = {
  LOGIN_ROOT: '/logger/login',
  ACTION_ROOT: '/logger/oper',
};

export { USER, COMMON, BASE, PERMISSION, ROLE, DEPT, DICT, LOG };
