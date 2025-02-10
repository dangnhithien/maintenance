import { ErrorDetailDto } from "../errorDetail/ErrorDetailDto";

export interface SolutionOptionDto {
  id: string;
  code: string;
  content: string;
  description?: string;
  errorDetailId: string;
  errorDetailCode: string;
  errorDetail?: ErrorDetailDto;
  isDeleted: boolean;
}
