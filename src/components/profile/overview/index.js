import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

export const Overview = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  return (
    <>
      <div className={styles.favourites}></div>
      <div className={styles.added}></div>
    </>
  );
};
