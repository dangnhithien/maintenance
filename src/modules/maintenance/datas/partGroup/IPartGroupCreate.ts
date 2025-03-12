export interface IPartGroupCreate {
  code: string;
  name: string;
  description?: string;
  image?: string;
  partCategoryId: string;
  partTypeId: string;
}
