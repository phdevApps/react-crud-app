export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: string;
}

export interface PostFilters {
  search: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  sortBy: 'title' | 'date';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}