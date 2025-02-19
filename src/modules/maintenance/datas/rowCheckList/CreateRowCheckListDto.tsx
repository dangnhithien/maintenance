import { EnumTypeValue } from "../enum/EnumTypeValue";

export interface CreateRowCheckListDto {
  id?: string;
  code: string;
  content: string;
  description?: string;
  typeErrorId?: string;
  templateCheckId: string;
  note?: string;
  typeValue?: EnumTypeValue;
  dropdownValues?: {
    [key: string]: string;
  };
  isHeader?: boolean;
  parentId?: string;
}
