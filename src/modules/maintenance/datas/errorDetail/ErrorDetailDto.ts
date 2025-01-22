import { TypeErrorDto } from "../typeError/TypeErrorDto";

export interface ErrorDetailDto {
  id: string;
  code: string;
  content: string;
  typeErrorId: string;
  typeErrorCode: string;
  typeError: TypeErrorDto;
}
