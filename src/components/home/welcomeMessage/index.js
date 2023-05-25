import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const WelcomeMessage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  return (
    <>
      <div className={styles.messageCont}>
        {location.search ? (
          <div className={styles.message}>
            <span className={styles.span}>We </span>found...
          </div>
        ) : currentUser?.username ? (
          <div className={styles.message}>
            <div>
              Hey {currentUser?.username},
              <span className={styles.span}> get inspired</span>
            </div>
            <div>and prepare something good!</div>
          </div>
        ) : (
          <div className={styles.message}>
            <div>
              <span className={styles.span}>Get inspired</span>
            </div>
            <div>and prepare something good!</div>
          </div>
        )}
      </div>
    </>
  );
};
