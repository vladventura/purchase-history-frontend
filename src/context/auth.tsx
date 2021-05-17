import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { JWT_TOKEN_KEY } from "../constants";

// This is the expected result from jwtDecode
interface Jwtitem {
  exp: number;
}
interface State {
  user: Jwtitem | null;
  login: (userData: { token: any }) => void;
  logout: () => void;
}
// This is like a replacement of Redux
const initState: State = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};

if (localStorage.getItem(JWT_TOKEN_KEY)) {
  const decoded: Jwtitem = jwtDecode(
    localStorage.getItem(JWT_TOKEN_KEY) as any
  );
  if (decoded.exp * 1000 < Date.now()) localStorage.removeItem(JWT_TOKEN_KEY);
  else initState.user = decoded;
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
} as State);

function authReducer(state: State, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

function AuthProvider(props: Object) {
  const [state, dispatch] = useReducer(authReducer, initState);
  const login = (userData: { token: any }) => {
    localStorage.setItem(JWT_TOKEN_KEY, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };