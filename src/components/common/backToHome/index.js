import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { MdFoodBank } from "react-icons/md";

export const BackToHome = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 onClick={() => navigate(`/`)}>
        <MdFoodBank className={styles.logo} />
        GoodFood
      </h1>
    </div>
  );
};
