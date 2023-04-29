// import React from "react";

// export const SingleRecipe = ({ selectedRecipe }) => {
//   console.log(selectedRecipe);
//   if (!selectedRecipe || selectedRecipe.length === 0) {
//     return <div style={{ marginTop: "200px" }}>No recipe selected</div>;
//   }
//   return <div style={{ marginTop: "200px" }}>{selectedRecipe[0].name}</div>;
// };

import React from "react";

export const SingleRecipe = ({ selectedRecipe }) => {
  return <div style={{ marginTop: "200px" }}>{selectedRecipe[0]?.name}</div>;
};
