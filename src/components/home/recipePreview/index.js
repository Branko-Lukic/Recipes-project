import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { BsClock } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { toggleFavourites } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { setFavourites } from "../../../store/reducers/authSlice";

export const RecipePreview = ({ name, id, addedBy, time, imgURL }) => {
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const favourites = currentUser?.favourites;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    favourites?.includes(id) ? setIsAddedToFav(true) : setIsAddedToFav(false);
  }, [favourites]);

  const handleClick = () => {
    toggleFavourites(auth?.currentUser?.uid, id).then((_) =>
      dispatch(setFavourites(id))
    );
    setIsAddedToFav((prev) => !prev);
  };

  const toggleFavBtn = isAddedToFav ? `${styles.addedToFav}` : ``;

  return (
    <div className={styles.containerr}>
      {auth?.currentUser ? (
        <FiHeart
          className={`${styles.favBtn} ${toggleFavBtn}`}
          onClick={handleClick}
        />
      ) : (
        ""
      )}
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
