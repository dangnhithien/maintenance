import { EnumStatusTaskCheck } from "../enum/EnumStatusTaskCheck";

export interface CreateTaskCheckDto {
  name?: string;
  note?: string;
  templateCheckId: string;
  deviceId: string;
  assigneeId: string;
  scheduledTime: string;
  caseTaskId: string;
}
export interface UpdateTaskCheckDto {
  status: EnumStatusTaskCheck;
  taskCheckId?: string;
  reason?: string;
}
