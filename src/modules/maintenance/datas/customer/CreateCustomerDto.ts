export interface CreateCustomerDto {
  code: string;
  image?: string;
  name: string;
  address?: string;
  phoneNumber?: string;
  customerRepresentativeName?: string;
  customerRepresentativePhoneNumber?: string;
  leadTechnicianId?: string;
  description?: string;
}
