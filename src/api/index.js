// ................... Recipes .............................
import { db } from "../firebase/config";
import { getDocs, getDoc, doc, collection, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

const recipesCollectionRef = collection(db, "recipes");

export const getAllRecipes = () =>
  getDocs(recipesCollectionRef).then((data) =>
    data.docs.map((doc) => ({
      ...doc.data(),
    }))
  );

export const getRecipesByName = (value) =>
  getDocs(recipesCollectionRef)
    .then((data) => data.docs.map((doc) => ({ ...doc.data() })))
    .then((res) =>
      res.filter((recipe) => {
        return (
          value &&
          recipe &&
          recipe.name &&
          recipe.name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );

export const getRecipeById = (id) => {
  const recipeDocumentRef = doc(db, `recipes`, id);
  return getDoc(recipeDocumentRef).then((doc) => doc.data());
};

export const getIngredientTags = () => {
  return getDocs(recipesCollectionRef)
    .then((data) => data.docs.map((doc) => ({ ...doc.data().ingTags })))
    .then((res) => [...new Set(res.flatMap((item) => Object.values(item)))]);
  // .then((res) => {
  //   const a = [];
  //   res.forEach((tag, i) => {
  //     a.push({ name: tag, id: i });
  //   });
  //   return a;
  // });
};

export const createNewRecipe = (
  name,
  addedBy,
  requiredTime,
  difficulty,
  servings,
  desc,
  imgURL,
  ings,
  ingTags,
  prepSteps,
  addedAt
) => {
  // const recipesCollectionRef = collection(db, "recipes");

  const newRecipe = {
    id: v4(),
    name,
    addedBy,
    rating: [],
    timesFavoured: 0,
    requiredTime,
    difficulty,
    servings,
    desc,
    imgURL,
    ings,
    ingTags,
    prepSteps,
    comments: [],
    addedAt,
  };
  const recipeRef = doc(recipesCollectionRef, newRecipe.id);
  setDoc(recipeRef, newRecipe);
};

// ................... Auth .............................
