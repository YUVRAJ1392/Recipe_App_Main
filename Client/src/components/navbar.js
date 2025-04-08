import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/Login");
  };

  const isLoggedIn = !!cookies.access_token;

  return (
    <div className="navbar">
      <div className="nav_left">
        <Link to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/create-recipe">Create Recipe</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
          </>
        )}
      </div>

      <div className="nav_link">
        {!isLoggedIn ? (
            <Link id="Login" to="/login">Login</Link>
        ) : (
          <button id="Logout" onClick={logout}>Logout</button>
        )}
        <Link id="Register" to="/register">Sign up</Link>
      </div>
    </div>
  );
};
