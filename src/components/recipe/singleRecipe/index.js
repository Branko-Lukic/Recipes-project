import React from "react";
import styles from "./index.module.css";
import RecipeImg from "../../../img/slika1.webp";
import { BsClock } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { TbChefHat } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

export const SingleRecipe = ({ selectedRecipe }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.headerTitle}>
              <h2>{selectedRecipe[0]?.name}</h2>
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.ratingFav}>
                <span>Rating {selectedRecipe[0]?.rating}</span>
                <span>
                  <FiHeart className={styles.favIcon} />
                  {selectedRecipe[0]?.timesFavoured}
                </span>
              </div>
              <div>
                <span>
                  <FaUserCircle className={styles.userIcon} />
                  {selectedRecipe[0]?.addedBy}
                </span>
              </div>
              <div className={styles.details}>
                <span>
                  <BsClock className={styles.icon} />
                  {selectedRecipe[0]?.requiredTime} mins
                </span>
                <span>
                  {" "}
                  <TbChefHat className={`${styles.icon} ${styles.iconChef}`} />
                  {selectedRecipe[0]?.difficulty}
                </span>
                <span>
                  {" "}
                  <GiKnifeFork className={styles.icon} />
                  {selectedRecipe[0]?.servings}
                </span>
              </div>
              <div className={styles.description}>
                {selectedRecipe[0]?.desc}
              </div>
            </div>
          </div>
          <div className={styles.imgDiv}>
            <img src={RecipeImg} alt="recipeImg" className={styles.img} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.ingCont}>
            <h2>Ingredients</h2>
            <div className={styles.ing}>
              {selectedRecipe[0]?.ingredients &&
                (selectedRecipe[0]?.ingredients).map((ing, index) => (
                  <div className={styles.ingRow} key={index}>
                    {ing}
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.prepCont}>
            <h2>Preparation</h2>
            <div className={styles.prep}>
              {selectedRecipe[0]?.preparation &&
                (selectedRecipe[0]?.preparation).map((elem, index) => (
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
