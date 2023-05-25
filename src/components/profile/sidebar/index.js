import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserImg from "../../../img/user1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { setCurrentUser } from "../../../store/reducers/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

export const Sidebar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const location = useLocation();

  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useCurrentUser();

  const handleLogoutBtnClick = () => {
    signOut(auth).then((_) => dispatch(setCurrentUser(null)));
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.user}>
        <img src={UserImg} alt="userImg" className={styles.img} />
        <div>{currentUser?.username}</div>
      </div>

      <div
        className={`${styles.link} ${
          path == "overview" ? styles.selected : ""
        } ${path == "overview" ? styles.whiteText : styles.redText} `}
        onClick={() => navigate("/profile/overview")}
      >
        Overview
      </div>
      <div
        className={`${styles.link} ${
          path == "add-new-recipe" ? styles.selected : ""
        } ${path == "add-new-recipe" ? styles.whiteText : styles.redText}`}
        onClick={() => navigate("/profile/add-new-recipe")}
      >
        Add new recipe
      </div>
      <div
        className={`${styles.link} ${styles.redText}`}
        onClick={handleLogoutBtnClick}
      >
        Logout
      </div>
    </div>
  );
};
