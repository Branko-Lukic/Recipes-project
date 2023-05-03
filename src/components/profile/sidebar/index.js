import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [activePage, setActivePage] = useState("overview");

  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  return (
    <div className={styles.sidebar}>
      <div>slika i user</div>

      <div
        className={`${styles.link} ${
          path == "overview" ? styles.selected : ""
        } `}
        onClick={() => navigate("/profile/overview")}
      >
        overview
      </div>
      <div
        className={`${styles.link} ${
          path == "add-new-recipe" ? styles.selected : ""
        } `}
        onClick={() => navigate("/profile/add-new-recipe")}
      >
        add new recipe
      </div>
    </div>
  );
};
