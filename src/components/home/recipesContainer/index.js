import React from "react";
import styles from "./index.module.css";
import { RecipePreview } from "../recipePreview";
import { useDispatch, useSelector } from "react-redux";

export const RecipesContainer = ({ searchedRecipes }) => {
  const renderRecipePreviews = () =>
    searchedRecipes.map((rec) => (
      <RecipePreview key={rec.id} name={rec.name} addedBy={rec.addedBy} time={rec.requiredTime} id={rec.id} />
    ));

  return <div className={styles.container}>{renderRecipePreviews()}</div>;
};
