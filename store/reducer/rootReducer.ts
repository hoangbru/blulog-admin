import { postReducer } from "./postReducer";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";

import { Post } from "@/types/post";
import { User } from "@/types/user";
import { Category } from "@/types/category";

export interface AppState {
  posts: Post[];
  users: User[];
  categories: Category[];
}

export interface AppStateAction {
  type: string;
  payload?: any;
}

const rootReducer = (state: AppState, action: AppStateAction) => ({
  posts: postReducer(state.posts, action),
  users: userReducer(state.users, action),
  categories: categoryReducer(state.categories, action),
});

export default rootReducer;
