import { EnumStatusTaskCheck } from "../enum/EnumStatusTaskCheck";

export interface CreateTaskCheckDto {
  name?: string;
  note?: string;
  templateCheckId: string;
  productId: string;
  assigneeId: string;
  scheduledTime: string;
}
export interface UpdateTaskCheckDto {
  status: EnumStatusTaskCheck;
  taskCheckId?: string;
  reason?: string;
}
