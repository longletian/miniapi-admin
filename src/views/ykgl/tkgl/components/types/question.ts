export interface QuestionAnswerDtos {
  answerCode: string;
  answerContent: string;
  isRightResult: boolean;
  attachmentFiles: [];
  dzjx: string;
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
