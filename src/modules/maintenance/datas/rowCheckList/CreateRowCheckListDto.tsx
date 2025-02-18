export interface CreateRowCheckListDto {
  code: string;
  content: string;
  description?: string;
  typeErrorId: string;
  templateCheckId: string;
  note?: string;
  typeValue?: string;
  dropdownValues?: {
    [key: string]: string;
  };
  isHeader?: boolean;
  parentId?: string;
}
