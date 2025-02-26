import { TrackingDataDto } from "@datas/comon/TrackingDataDto";

export interface CustomerDto extends TrackingDataDto {
  id: string;
  code: string;
  name: string;
  address?: string | null;
  phoneNumber?: string | null;
  customerRepresentativeName?: string | null;
  customerRepresentativePhoneNumber?: string | null;
  description?: string | null;
  isDeleted: boolean;
  leadTechnicianId?: string;
}
