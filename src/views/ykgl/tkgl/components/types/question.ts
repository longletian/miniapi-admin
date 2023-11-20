export interface QuestionAnswerDtos {
  answerCode?: string;
  answerContent?: string;
  isRightResult?: boolean;
  attachmentFiles: [];
  dzjx?: string;
}

export interface QuestionAddDto {
  name: string;
  typeId?: number;
  typeName: string;
  categoryTypeId?: number;
  categoryTypeName: string;
  description: string;
  ztjx: string;
  attachmentFiles: [];
  questionAnswerDtos: Array<QuestionAnswerDtos>;
}

export interface QuestionAnswerInfoDto {
  id?: number;
  answerCode?: string;
  answerContent?: string;
  isRightResult?: boolean;
  dzjx?: string;
}

export interface QuestionInfoDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  questionScore?: number;
  categoryTypeId?: number;
  categoryTypeName?: string;
  ztjx?: string;
  questionAnswerInfoDtos?: Array<QuestionAnswerInfoDto>;
}
