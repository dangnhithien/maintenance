import { EnumTypeValue } from "../enum/EnumTypeValue";
import { RowCheckListDto } from "../rowCheckList/RowCheckListDto";

export interface RowCheckValueDto {
  id?: string;
  rowCheckContent?: string;
  rowCheckDescription?: string | null;
  errorDetailContent?: string;
  solutionOptionName?: string;
  solutionOptionDescription?: string;
  isPassed: boolean;
  errorDetailId: string;
  errorDetailCode?: string;
  errorDetail?: any | null;
  rowCheckListId: string;
  rowCheckListCode?: string;
  taskCheckId: string;
  taskCheckCode?: string;
  taskCheck?: any | null;
  solutionOptionId?: string;
  solutionOptionCode?: string;
  solutionOption?: any | null;
  rowCheckList?: RowCheckListDto;
  note?: string;
  rowCheck: null;
  order: number;
  value: string;
  typeValue: EnumTypeValue;
  isHeader: boolean;
  parentId: string;
  dropdownValues?: {
    [key: string]: string;
  };
}
