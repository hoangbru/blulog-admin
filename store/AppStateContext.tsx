import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

import rootReducer, { AppStateAction, AppState } from "./reducer/rootReducer";

const AppStateContext = createContext<
  { state: AppState; dispatch: Dispatch<AppStateAction> } | undefined
>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    posts: [],
    users: [],
    categories: [],
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
