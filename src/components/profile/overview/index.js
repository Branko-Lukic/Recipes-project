import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { getAddedRecipes, getFavouriteRecipes } from "../../../api";
import { MiniRecipePrewiew } from "../miniRecipePreview";

export const Overview = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  const [userFav, setUserFav] = useState([]);
  const [userAdded, setUserAdded] = useState([]);

  useEffect(() => {
    getFavouriteRecipes(currentUser?.favourites).then((favRecipes) =>
      setUserFav(favRecipes)
    );
    getAddedRecipes(currentUser?.added).then((addedRecipes) =>
      setUserAdded(addedRecipes)
    );
    console.log(userFav, userAdded);
  }, [currentUser]);
  const renderFav = () =>
    userFav.map((recipe) => (
      <MiniRecipePrewiew
        key={recipe.id}
        imgURL={recipe.imgURL}
        name={recipe.name}
        addedBy={recipe.addedBy}
        time={recipe.requiredTime}
        id={recipe.id}
      />
    ));

  const renderAdded = () =>
    userAdded.map((recipe) => (
      <MiniRecipePrewiew
        key={recipe.id}
        imgURL={recipe.imgURL}
        name={recipe.name}
        addedBy={recipe.addedBy}
        time={recipe.requiredTime}
        id={recipe.id}
      />
    ));

  return (
    <div className={styles.overview}>
      <h3>Favourites</h3>
      <div className={styles.container}>{renderFav()}</div>
      <h3>My recipes</h3>
      <div className={styles.container}>{renderAdded()}</div>
    </div>
  );
};
