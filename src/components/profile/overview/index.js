import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";

export const Overview = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  return (
    <>
      <h3>Favourites</h3>
      <div className={styles.favourites}></div>
      <h3>My recipes</h3>
      <div className={styles.added}></div>
    </>
  );
};
