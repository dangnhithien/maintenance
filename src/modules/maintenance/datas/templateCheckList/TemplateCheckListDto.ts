import { IDevice } from "../device/IDevice";
import { RowCheckListDto } from "../rowCheckList/RowCheckListDto";

export interface TemplateCheckListDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  deviceId: string;
  deviceCode: string;
  device: IDevice;
  rowChecks?: RowCheckListDto[];
}
