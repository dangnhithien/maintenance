import { IPartCategory } from "../partCategory/IPartCategory";

export interface IPartType {
  id: string;
  code: string;
  name: string;
  description?: string;
  partCategoryId: string;
  partCategoryCode: string;
  partCategory?: IPartCategory;
}
