export interface Category {
  _id: string;
  name: string;
  icon?: string | null;
  sub_category?: Array<Category> | null;
  isSubCategory?: boolean;
  public?: boolean;
  created_by?: string;
}

export type PostCategory = Omit<Category, '_id'>;
