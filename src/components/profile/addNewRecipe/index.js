import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { useUploadImage } from "./hooks/useUploadImage";
import { useManageRows } from "./hooks/useManageRows";
import { useRowsStateUpdate } from "./hooks/useRowsStateUpdate";
import { db } from "../../../firebase/config";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { createNewRecipe } from "../../../api";

export const AddNewRecipe = () => {
  // const error = useSelector((state) => state.recipes.error);
  const currentUser = useSelector((state) => state.auth.currentUser);
  // console.log(currentUser.username);

  const [imageURL, setImageUpload] = useUploadImage();
  const [
    { ingRow, prepStep },
    { addNewIngRow, deleteIngRow, addNewPrepStep, deletePrepStep },
  ] = useManageRows();

  const [
    { ings, setIngs },
    { ingTags, setIngTags },
    { prepSteps, setPrepSteps },
    rowsStateUpdate,
  ] = useRowsStateUpdate();

  const ingredients = ings.map((ing) => ing.text);
  const ingredientTags = ingTags.map((ingTag) => ingTag.text);
  const preparationSteps = prepSteps.map((prepStep) => prepStep.text);

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className={styles.addNewRecipe}>
        <div className={styles.header}>
          <div className={styles.descCont}>
            <div>
              <h3>Recipe header</h3>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Recipe title"
                className={styles.title}
              />
            </div>

            <div className={styles.char}>
              <div>
                <span>Difficulty level</span>
                <select
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Easy">Easy</option>
                  <option value="More effort">More effort</option>
                  <option value="A challenge">A challenge</option>
                </select>
              </div>
              <div>
                <span>Time</span>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  type="number"
                  min={0}
                  className={styles.timeAndServings}
                />
              </div>
              <div>
                <span>Number of servings</span>
                <input
                  onChange={(e) => setServings(e.target.value)}
                  type="number"
                  className={styles.timeAndServings}
                  min={0}
                />
              </div>
            </div>
            <div>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Description"
              />
            </div>
          </div>
          <div className={styles.imgCont}>
            <div className={styles.showImg}>
              {imageURL ? (
                <img className={styles.img} src={imageURL} />
              ) : (
                "Meal image"
              )}
            </div>
            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className={styles.chooseFile}
            />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.ingCont}>
            <h3>Ingredients</h3>
            {ingRow.map(({ id }, i) => (
              <div className={styles.ingRow} key={id}>
                <div>
                  <span>Ingredient</span>
                  <input
                    onChange={(e) => rowsStateUpdate("INGS", id, e)}
                    type="text"
                    placeholder="500g chicken breasts, sliced"
                    className={styles.ingDesc}
                  />
                </div>
                <div>
                  <span>Ingredient tag</span>
                  <input
                    onChange={(e) => rowsStateUpdate("INGS-TAGS", id, e)}
                    type="text"
                    placeholder="chicken"
                    className={styles.ingTag}
                  />
                </div>
                {i !== 0 && (
                  <button
                    className={styles.closeIngBtn}
                    onClick={() => {
                      const newIngs = ings.filter((ing) => ing.id !== id);
                      const newIngTags = ingTags.filter(
                        (ingTag) => ingTag.id !== id
                      );
                      setIngs(newIngs);
                      setIngTags(newIngTags);

                      deleteIngRow(id);
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button className={styles.AddBtn} onClick={addNewIngRow}>
              Add next ingredient
            </button>
          </div>

          <div className={styles.prepCont}>
            <h3>Preparation steps</h3>
            {prepStep.map(({ id }, i) => (
              <div className={styles.prepRow} key={id}>
                <div>
                  <span>Step {i + 1}</span>
                  <textarea
                    onChange={(e) => rowsStateUpdate("PREP-STEPS", id, e)}
                    type="text"
                    placeholder="First, boil the rice"
                  />
                </div>
                {i !== 0 && (
                  <button
                    className={styles.closePrepBtn}
                    onClick={() => {
                      const newPrepSteps = prepSteps.filter(
                        (step) => step.id !== id
                      );
                      setPrepSteps(newPrepSteps);

                      deletePrepStep(id);
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button className={styles.AddBtn} onClick={addNewPrepStep}>
              Add next step
            </button>
          </div>
        </div>
        <div className={styles.divPublish}>
          <button
            onClick={() =>
              createNewRecipe(
                title,
                currentUser.username,
                time,
                difficulty,
                servings,
                description,
                imageURL,
                ingredients,
                ingredientTags,
                preparationSteps,
                (() => {
                  const currentDate = new Date();
                  const day = currentDate.getDate();
                  const month = currentDate.getMonth() + 1;
                  const year = currentDate.getFullYear();
                  return `${day}.${month}.${year}`;
                })()
              )
            }
          >
            Publish recipe
          </button>
        </div>
      </div>
    </>
  );
};
