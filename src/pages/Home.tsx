import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../context/auth";

const Home = () => {
  const { user } = useContext(AuthContext);
  const redirect = <Redirect to="/login" />;
  const home = <div>Home Page</div>;
  return user ? home : redirect;
};

export { Home };
