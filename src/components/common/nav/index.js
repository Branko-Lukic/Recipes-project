import React from "react";
import styles from "./index.module.css";
import SearchBar from "./search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className={styles.container}>
        <h1 onClick={() => navigate(`/`)}> Be Recipe</h1>
        <SearchBar />
        <div className={styles.logInReg}>
          <span onClick={() => navigate(`/register`)}>Sign up</span>
          <span onClick={() => navigate(`/login`)}>Login</span>
          <span onClick={() => navigate(`/profile`)}>Profile</span>
          <span onClick={() => navigate(`/`)}>Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
