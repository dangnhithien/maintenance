import axios from "axios";

export interface ApiResponse<T> {
  success: boolean;
  result: {
    items: T[];
    totalCount: number;
  };
  message: string;
  statusCode: number;
}
export const unwrapReponse = <T>(response: ApiResponse<T>): T[] => {
  if (response.success && response.result) {
    return response.result.items;
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
