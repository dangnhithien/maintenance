export interface ICaseCreate {
  name: string;
  note?: string;
  scheduledTime: string;
  customerId: string;
  deviceId: string;
  assigneeId: string;
  caseTypeId: string;
}
