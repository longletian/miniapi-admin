import axios from '@/api/base/interceptor';
import { USER, BASE } from '@/api/xtgl/constants/funcUrl';

export const getUserList = (params: any) => axios.get(USER.ROOT + BASE.LIST);
