import { EnumTypeValue } from "../enum/EnumTypeValue";

export interface UpdateRowCheckListDto {
  content?: string;
  typeErrorId?: string;
  typeValue?: EnumTypeValue;
  dropdownValues?: {
    [key: string]: string;
  };
}
