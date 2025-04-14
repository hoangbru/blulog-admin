import { Post } from "./post";
import { User } from "./user";

export interface Comment {
  id: string | number;
  post: Post;
  user: User;
  replies: Comment[];
  likes: string[];
  parentComment: string | number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
