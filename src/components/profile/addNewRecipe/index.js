import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { useUploadImage } from "./hooks/useUploadImage";
import { useManageRows } from "./hooks/useManageRows";

export const AddNewRecipe = () => {
  const [imageURL, setImageUpload] = useUploadImage();
  const [
    { ingRow, prepStep },
    { addNewIngRow, deleteIngRow, addNewPrepStep, deletePrepStep },
  ] = useManageRows();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [description, setDescription] = useState("");
  const [ings, setIngs] = useState([]);
  const [ingTags, setIngTags] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);

  console.log(ings);
  console.log(ingTags);
  console.log(prepStep);

  const rowsStateUpdate = (rowType, id, e) => {
    switch (rowType) {
      case "INGS":
        {
          const includes = ings.some((ing) => ing.id === id);
          if (includes) {
            const newIngs = ings.map((ing) =>
              ing.id === id ? { id, text: e.target.value } : ing
            );
            setIngs(newIngs);
          } else {
            setIngs([
              ...ings,
              {
                id,
                text: e.target.value,
              },
            ]);
          }
        }

        break;
      case "INGS-TAGS":
        {
          const includes = ingTags.some((ing) => ing.id === id);
          if (includes) {
            const newingsTags = ingTags.map((ing) =>
              ing.id === id ? { id, text: e.target.value } : ing
            );
            setIngTags(newingsTags);
          } else {
            setIngTags([
              ...ingTags,
              {
                id,
                text: e.target.value,
              },
            ]);
          }
        }

        break;

      case "PREP-STEPS":
        {
          const includes = prepSteps.some((prep) => prep.id === id);
          if (includes) {
            const newSteps = prepSteps.map((prep) => {
              console.log(e.target.value);
              console.log(id);
              return prep.id === id ? { id, text: e.target.value } : prep;
            });
            console.log(newSteps);
            setPrepSteps(() => [...newSteps]);
          } else {
            setPrepSteps((prevPrepSteps) => {
              console.log(e.target.value);
              return [...prevPrepSteps, { id, text: e.target.value }];
            });
          }
        }

        break;

      default:
        break;
    }
  };

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
                    setTitle(e.target.value);
                  }}
                >
                  <option value="0">Easy</option>
                  <option value="1">More effort</option>
                  <option value="2">A challenge</option>
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
              <textarea type="text" placeholder="Description" />
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
                      setIngs(newIngs);
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
                    onClick={() => deletePrepStep(id)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button className={styles.AddBtn} onClick={addNewPrepStep}>
              Add next step
            </button>

            <button onClick={() => {}}>Publish recipe</button>
          </div>
        </div>
      </div>
    </>
  );
};
