import { createContext, useReducer } from "react";

type UIState = {
  showMessage: boolean;
  message: string;
  displayMessage: (message: string) => void;
};

const initState: UIState = {
  showMessage: false,
  message: "",
  displayMessage: (message: string) => {},
};

export const UIContext = createContext(initState);

const uiReducer = (state: UIState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      return { ...state, message: action.payload, showMessage: true };
    case "HIDE_MESSAGE":
      return { ...state, message: "", showMessage: false };
    default:
      return state;
  }
};

export const UIProvider = (props: Object) => {
  const [state, dispatch] = useReducer(uiReducer, initState);
  const displayMessage = (message: string, timeout?: number) => {
    dispatch({
      payload: message,
      type: "SHOW_MESSAGE",
    });
    setTimeout(
      () =>
        dispatch({
          type: "HIDE_MESSAGE",
        }),
      timeout ?? 2000
    );
  };
  return (
    <UIContext.Provider
      value={{
        message: state.message,
        showMessage: state.showMessage,
        displayMessage,
      }}
      {...props}
    />
  );
};
