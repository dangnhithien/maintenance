import { IPartCategory } from "../partCategory/IPartCategory";

export interface IPartSKU {
  id: string;
  code: string;
  name: string;
  description?: string;
  partCategoryId: string;
  partTypeId: string;
  partCategoryCode: string;
  partTypeCode: string;
  partCategory?: IPartCategory;
  partType?: IPartCategory;
  partGroupCode: string;
  partGroup?: IPartCategory;
  partGroupId: string;
}
