export interface AttachmentListData {
  id: number;
  fileType: number;
  businessTypeId: number;
  storeTypeId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileMediaType: number;
  isGenerateVideoImage: boolean;
  videoCoverPath: string;
  videoPreviewPath: string;
}

export interface AttachmentSearchParams extends Partial<AttachmentListData> {
  page: number;
  pageSize: number;
}
