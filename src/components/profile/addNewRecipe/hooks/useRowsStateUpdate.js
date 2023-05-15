import React from "react";
import { useState } from "react";

export const useRowsStateUpdate = () => {
  const [ings, setIngs] = useState([]);
  const [ingTags, setIngTags] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);

  // const ingsText = ings.map((ing) => ing.text);
  // const ingTagsText = ingTags.map((ingTag) => ingTag.text);
  // const prepStepsText = prepSteps.map((prepStep) => prepStep.text);

  const rowsStateUpdate = (rowType, id, e) => {
    switch (rowType) {
      case "INGS":
        {
          const includes = ings.some((ing) => ing.id === id);
          // if(ings.includes({}))
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
    }
  };

  return [
    { ings, setIngs },
    { ingTags, setIngTags },
    { prepSteps, setPrepSteps },
    rowsStateUpdate,
  ];
};
