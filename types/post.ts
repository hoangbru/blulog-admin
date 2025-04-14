import { Category } from "./category";
import { User } from "./user";

export interface Post {
  id: string | number;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  author: User;
  views: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
