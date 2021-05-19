import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/auth";
import React, { useContext } from "react";

interface AuthRouteProps extends RouteProps {
  component: React.FC<RouteProps>;
  rest?: any;
};

const AuthRoute = ({ component: Component, ...rest }: AuthRouteProps) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    ></Route>
  );
};

export { AuthRoute };
