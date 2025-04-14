import { Category } from "@/types/category";

interface CategoryAction {
  type: string;
  payload?: any;
}

export const categoryReducer = (
  state: Category[],
  action: CategoryAction
) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY":
      return action.payload;
    case "ADD_CATEGORY":
      return [action.payload, ...state];
    case "DELETE_CATEGORY":
      const newState = state.filter((item) => item.id != action.payload.id);
      return newState;
    case "UPDATE_CATEGORY":
      const updatedData = state.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );
      return updatedData;
    default:
      return state;
  }
};
