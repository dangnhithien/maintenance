import axios from "axios";

export interface ApiResponseWithList<T> {
  success: boolean;
  result: {
    items: T[];
    totalCount: number;
  };
  message: string;
  statusCode: number;
}

export interface ApiResponseWithObject<T> {
  success: boolean;
  result: T;
  message: string;
  statusCode: number;
}

// Union type
export type ApiResponse<T> = ApiResponseWithList<T> | ApiResponseWithObject<T>;

export const unwrapListReponse = <T>(response: ApiResponseWithList<T>): T[] => {
  if (response.success && response.result) {
    return response.result.items;
  } else {
    throw new Error(response.message || "Failed to fetch data");
  }
};
export const unwrapObjectReponse = <T>(
  response: ApiResponseWithObject<T>
): T => {
  if (response.success && response.result) {
    return response.result;
  } else {
    throw new Error(response.message || "Failed to fetch data");
  }
};

interface ApiError {
  code?: number;
  message: string;
  status?: number;
}

export const unwrapError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const responseError = error.response?.data?.error;
    return {
      code: responseError?.code,
      message: responseError?.message || "An unknown error occurred.",
      status: error.response?.status,
    };
  }
  return {
    message: "An unexpected error occurred.",
  };
};
