import { Post } from "@/types/post";

interface PostAction {
  type: string;
  payload?: any;
}

export const postReducer = (state: Post[], action: PostAction) => {
  switch (action.type) {
    case "GET_ALL_POST":
      return action.payload;
    case "ADD_POST":
      return [action.payload, ...state];
    case "DELETE_POST":
      const newState = state.filter((item) => item.id != action.payload.id);
      return newState;
    case "UPDATE_POST":
      const updatedData = state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );
      return updatedData;
    default:
      return state;
  }
};
