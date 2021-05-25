import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { JWT_TOKEN_KEY } from "../constants";
import { Item, User, UserProfile } from "../graphql/schemas";
import { UserMutation } from "../graphql/mutations";

// This is the expected result from jwtDecode
interface Jwtitem extends User {
  exp: number;
}
interface State {
  user: Jwtitem | null;
  login: (userData: UserMutation) => void;
  logout: () => void;
  addItem: (item: Item) => void;
}

// This is like a replacement of Redux
const initState: State = {
  user: null,
  login: (userData: UserMutation) => {},
  logout: () => {},
  addItem: (item) => {},
};

if (localStorage.getItem(JWT_TOKEN_KEY)) {
  const decoded: Jwtitem = jwtDecode(
    localStorage.getItem(JWT_TOKEN_KEY) as any
  );
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("userProfile");
    localStorage.removeItem(JWT_TOKEN_KEY);
  } else {
    const profile =
      JSON.parse(localStorage.getItem("userProfile") || "") ??
      ({} as UserProfile);
    initState.user = { ...decoded, profile };
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: UserMutation) => {},
  logout: () => {},
  addItem: (item) => {},
} as State);

function authReducer(state: State, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_ITEM":
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state?.user?.profile, ...action.payload },
        },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state?.user?.profile, ...action.payload },
        },
      };
    case "EDIT_ITEM":
      return {
        ...state,
        user: {
          ...state.user,
          profile: { ...state?.user?.profile, ...action.payload },
        },
      };
    default:
      return state;
  }
}

function AuthProvider(props: Object) {
  const [state, dispatch] = useReducer(authReducer, initState);
  const login = (userData: UserMutation) => {
    console.log(userData);
    localStorage.setItem(
      JWT_TOKEN_KEY,
      userData.data.register?.token || userData.data.login?.token || ""
    );
    const user = userData.data.register ?? userData.data.login;
    // Save the profile here
    const profile = user?.profile;
    console.log(profile);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    dispatch({
      type: "LOGIN",
      payload: { ...user, profile },
    });
  };
  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem("userProfile");
    dispatch({
      type: "LOGOUT",
    });
  };
  const addItem = (item: Item) => {
    const localStorageProfile =
      JSON.parse(localStorage.getItem("userProfile") || "") ??
      ({} as UserProfile);

    const newProfile = {
      totalPrice: localStorageProfile?.totalPrice + item.price,
      totalCost: localStorageProfile?.totalCost + item.cost,
      totalAddedItems: localStorageProfile?.totalAddedItems + 1,
    };

    localStorage.setItem("userProfile", JSON.stringify(newProfile));

    dispatch({
      type: "ADD_ITEM",
      payload: newProfile,
    });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, addItem }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
