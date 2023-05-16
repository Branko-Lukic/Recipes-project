import React from "react";
import styles from "./index.module.css";
// import RecipeImg from "../../../img/slika1.webp";
import { BsClock } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { TbChefHat } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
// import { getRecipeById } from "../../../api";

export const SingleRecipe = ({ selectedRecipe }) => {
  // console.log(selectedRecipe);
  // getRecipeById(param).then((res)=>dispatch(setSelected(res))) BITNO ...
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.headerTitle}>
              <h2>{selectedRecipe.name}</h2>
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.ratingFav}>
                <span>Rating {selectedRecipe.rating}</span>
                <span>
                  <FiHeart className={styles.favIcon} />
                  {selectedRecipe.timesFavoured}
                </span>
              </div>
              <div>
                <span>
                  <FaUserCircle className={styles.userIcon} />
                  {selectedRecipe.addedBy}
                </span>
                <span>{selectedRecipe.addedAt}</span>
              </div>
              <div className={styles.details}>
                <span>
                  <BsClock className={styles.icon} />
                  {selectedRecipe.requiredTime} mins
                </span>
                <span>
                  {" "}
                  <TbChefHat className={`${styles.icon} ${styles.iconChef}`} />
                  {selectedRecipe.difficulty}
                </span>
                <span>
                  {" "}
                  <GiKnifeFork className={styles.icon} />
                  {selectedRecipe.servings}
                </span>
              </div>
              <div className={styles.description}>{selectedRecipe.desc}</div>
            </div>
          </div>
          <div className={styles.imgDiv}>
            <img
              src={selectedRecipe.imgURL}
              alt="recipeImg"
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.ingCont}>
            <h2>Ingredients</h2>
            <div className={styles.ing}>
              {selectedRecipe.ings &&
                selectedRecipe.ings.map((ing, index) => (
                  <div className={styles.ingRow} key={index}>
                    {ing}
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.prepCont}>
            <h2>Preparation</h2>
            <div className={styles.prep}>
              {selectedRecipe.prepSteps &&
                selectedRecipe.prepSteps.map((elem, index) => (
                  <div className={styles.prepRow} key={index}>
                    <span>STEP {index + 1}</span>
                    <p>{elem}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
