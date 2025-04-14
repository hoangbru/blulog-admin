import { User } from "@/types/user";

interface UserAction {
  type: string;
  payload?: any;
}

export const userReducer = (state: User[], action: UserAction) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return;
    case "GET_ALL_USER":
      return action.payload;
    case "ADD_USER":
      return [action.payload, ...state];
    case "DELETE_USER":
      const newState = state.filter((item) => item.id != action.payload.id);
      return newState;

    default:
      return state;
  }
};
