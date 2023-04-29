import React, { useState } from "react";
import styles from "./index.module.css";
import { MdTune } from "react-icons/md";

export const Filter = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [openBtnActive, setOpenBtnActive] = useState(true);

  const toggleFilter = filterActive ? `` : `${styles.filterClosed}`;

  const handleClick = () => {
    setFilterActive(!filterActive);
    setTimeout(() => {
      setOpenBtnActive(!openBtnActive);
    }, 300);
  };

  return (
    <div className={`${styles.filter} ${toggleFilter}`}>
      <span className={styles.close} onClick={handleClick}>
        <MdTune />
      </span>
      {!filterActive && openBtnActive && (
        <span className={styles.open} onClick={handleClick}>
          <MdTune />
        </span>
      )}
    </div>
  );
};
