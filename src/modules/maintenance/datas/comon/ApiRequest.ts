export interface ApiRequest {
  searchTerm?: string;
  isDeleted?: boolean;
  takeCount?: number;
  skipCount?: number;
  sortBy?: number;
  includeProperties?: string;
}
