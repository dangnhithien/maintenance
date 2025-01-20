export interface ApiResponse<T> {
  success: boolean;
  result: {
    items: T[];
    totalCount: number;
  };
  message: string;
  statusCode: number;
}
export const unwrap = <T>(response: ApiResponse<T>): T[] => {
  if (response.success && response.result) {
    return response.result.items;
  } else {
    throw new Error(response.message || "Failed to fetch data");
  }
};
