export interface Category {
  _id: string;
  name: string;
  icon?: string;
  sub_category?: Array<Category> | null | PostCategory[];
  isSubCategory?: boolean;
  public?: boolean;
}

export type PostCategory = Omit<Category, '_id'>;
