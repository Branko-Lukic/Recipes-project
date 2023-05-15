import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { MdTune } from "react-icons/md";
import Multiselect from "multiselect-react-dropdown";
import { getIngredientTags } from "../../../api";

export const Filter = ({ filterData }) => {
  const [filterActive, setFilterActive] = useState(false);
  const [openBtnActive, setOpenBtnActive] = useState(true);

  const toggleFilter = filterActive ? `` : `${styles.filterClosed}`;

  const handleClick = () => {
    setFilterActive(!filterActive);
    setTimeout(() => {
      setOpenBtnActive(!openBtnActive);
    }, 300);
    filterData && filterData(!filterActive);
  };

  useEffect(() => {
    getIngredientTags();
  }, []);

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

      {/* <Multiselect /> */}
    </div>
  );
};
