export interface IPartTypeCreate {
  code: string;
  name: string;
  description?: string;
  image?: string;
  partCategoryId: string;
}
