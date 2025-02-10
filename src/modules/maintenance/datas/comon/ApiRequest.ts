export interface ApiRequest {
  searchTerm?: string;
  isDeleted?: boolean;
  takeCount?: number;
  skipCount?: number;
  sortBy?: string;
  includeProperties?: string;
  fromDate?: Date;
  toDate?: Date;
}
