export interface CreateRowCheckListDto {
  code: string;
  name: string;
  description?: string;
  typeErrorId: string;
  templateCheckListId: string;
}
