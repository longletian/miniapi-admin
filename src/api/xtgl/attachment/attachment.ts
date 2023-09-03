import axios from '@/utils/request';
import { ATTACHMENT, BASE, COMMON } from '@/api/xtgl/constants/funcUrl';
import { AttachmentSearchParams } from './type';

// 获取附件分页列表
export const getPageAttachmentListData = (params: AttachmentSearchParams) =>
  axios.get(`${ATTACHMENT.ROOT}/list`, { params });
