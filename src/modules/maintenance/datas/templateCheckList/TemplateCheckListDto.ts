import { DeviceDto } from "../device/DeviceDto";
import { RowCheckListDto } from "../rowCheckList/RowCheckListDto";

export interface TemplateCheckListDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  deviceId: string;
  deviceCode: string;
  device: DeviceDto;
  rowChecks?: RowCheckListDto[];
}
