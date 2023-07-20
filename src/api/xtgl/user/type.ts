import axios from 'axios';

enum contanturl {
  LOGIN_URL = '',
  USER_INFO = '',
}

export const reqLogin = (data: any) => axios.post(contanturl.LOGIN_URL, data);

export const reqLogin1 = (data: any) => axios.post(contanturl.LOGIN_URL, data);
