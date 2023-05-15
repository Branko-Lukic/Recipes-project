import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { RecipePreview } from "../recipePreview";
import { useDispatch, useSelector } from "react-redux";

export const RecipesContainer = ({ searchedRecipes, filterProp }) => {
  const renderRecipePreviews = () =>
    searchedRecipes.map((rec) => (
      <RecipePreview
        key={rec.id}
        imgURL={rec.imgURL}
        name={rec.name}
        addedBy={rec.addedBy}
        time={rec.requiredTime}
        id={rec.id}
      />
    ));

  const filterActive = filterProp
    ? styles.containerFilterActive
    : styles.container;

  // console.log(filterProp);

  return <div className={filterActive}>{renderRecipePreviews()}</div>;
};
