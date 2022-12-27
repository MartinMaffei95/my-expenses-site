export interface User {
  name: string;
  description: string;
  balance: number;
  currency: string;
  type: string;
  tags: string[];
  color: string;
  from: string;
  shared_with: string[];
  transactions: string[];
  createdAt: string;
  updatedAt: string;
}
