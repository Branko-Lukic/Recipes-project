import React from "react";
import styles from "./index.module.css";

export const PageLayout = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};
