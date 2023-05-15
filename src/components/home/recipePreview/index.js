import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Prewiew from "../../../img/slika1.webp";
import { BsClock } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

export const RecipePreview = ({ name, id, addedBy, time, imgURL }) => {
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsAddedToFav(!isAddedToFav);
  };

  const toggleFavBtn = isAddedToFav ? `${styles.favBtnClick}` : ``;

  return (
    <div className={styles.containerr}>
      <FiHeart
        className={`${styles.favBtn} ${toggleFavBtn}`}
        onClick={handleClick}
      />
      <div
        onClick={() => navigate(`/recipe?recipeId=${id}`)}
        className={styles.container}
      >
        <img src={imgURL} alt={"Prewiew image"} />
        <div className={styles.text}>
          <div className={styles.upperText}>
            <span>{addedBy}</span>
            <span>
              <BsClock className={styles.clock} /> {time} min
            </span>
          </div>
          <div className={styles.lowerText}>
            <span className={styles.name}>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
