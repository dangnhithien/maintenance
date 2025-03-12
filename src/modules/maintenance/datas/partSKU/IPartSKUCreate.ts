export interface IPartSKUCreate {
  code: string;
  name: string;
  description?: string;
  image?: string;
  partCategoryId: string;
  partTypeId: string;
  partGroupId: string;
}
