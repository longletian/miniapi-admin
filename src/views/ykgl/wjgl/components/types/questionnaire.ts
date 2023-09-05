export interface QuestionDto {
  questionId: number;
  isRequired?: boolean;
  sortNum?: number;
  questionScore?: number;
}
export interface AddQuestionnaireDto {
  name: string;
  fullScore?: number;
  typeId?: number;
  typeName: string;
  description: string;
  isRandomGenerate?: boolean;
  isPublished?: boolean;
  yxqStime?: Date;
  yxqEtime?: Date;
  questionDtos: Array<QuestionDto>;
}
