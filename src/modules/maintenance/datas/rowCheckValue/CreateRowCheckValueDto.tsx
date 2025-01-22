export interface CreateRowCheckValueDto {
  rowCheckListName: string;
  rowCheckListDescription: string;
  errorDetailContent: string;
  solutionOptionName: string;
  solutionOptionDescription: string;
  isPassed: boolean;
  errorDetailId: string;
  rowCheckListId: string;
  taskCheckId: string;
  solutionOptionId: string;
}
