// ................... Recipes .............................
import { db } from "../firebase/config";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const recipesCollectionRef = collection(db, "recipes");
// const usersCollectionRef = collection(db, "users");

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

export const getFilteredRecipe = (
  search,
  ingTags,
  time,
  difficulty,
  servings
) => {
  return getAllRecipes()
    .then((allRecipes) =>
      !search
        ? allRecipes
        : allRecipes.filter((recipe) => {
            return (
              search &&
              recipe &&
              recipe.name.toLowerCase().includes(search.toLowerCase())
            );
          })
    )
    .then((recipes) => {
      // console.log(recipes, "ING TAGS");
      return ingTags === undefined
        ? recipes
        : recipes.filter((recipe) =>
            ingTags.every((ing) => recipe.ingTags.includes(ing))
          );
    })
    .then((recipes) => {
      // console.log(recipes, "tTIME");
      return !time
        ? recipes
        : recipes.filter((recipe) =>
            time === "Under 15 minutes"
              ? recipe.requiredTime < 15
              : time === "Under 30 minutes"
              ? recipe.requiredTime < 30
              : time === "Under 45 minutes"
              ? recipe.requiredTime < 45
              : time === "Under 1 hour"
              ? recipe.requiredTime < 60
              : recipe.requiredTime > 60
          );
    })
    .then((recipes) => {
      // console.log(recipes, "DIFFICULTY");
      return !difficulty
        ? recipes
        : recipes.filter((recipe) => recipe.difficulty === difficulty);
    })
    .then((recipes) => {
      // console.log(recipes, "SERVINGS");
      // console.log(servings);
      return !servings
        ? recipes
        : recipes.filter((recipe) =>
            servings === "1 serving"
              ? recipe.servings === "1"
              : servings === "2 servings"
              ? recipe.servings === "2"
              : servings === "3 servings"
              ? recipe.servings === "3"
              : servings === "4 servings"
              ? recipe.servings === "4"
              : servings === "5 servings"
              ? recipe.servings === "5"
              : servings === "6 servings"
              ? recipe.servings === "6"
              : recipe.servings > 6
          );
    });
};

export const getRecipeById = (id) => {
  const recipeDocumentRef = doc(db, `recipes`, id);
  return getDoc(recipeDocumentRef).then((doc) => doc.data());
};

export const getIngredientTags = () => {
  return getDocs(recipesCollectionRef)
    .then((data) => data.docs.map((doc) => ({ ...doc.data().ingTags })))
    .then((res) => [...new Set(res.flatMap((item) => Object.values(item)))]);
};

export const createNewRecipe = (
  userUid,
  id,
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
  const newRecipe = {
    id,
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

  //Adding to user.added
  const userRef = doc(db, `users`, userUid);
  getDoc(userRef)
    .then((doc) => doc.data())
    .then((user) =>
      setDoc(userRef, {
        ...user,
        added: [...user.added, newRecipe.id],
      })
    );
};

export const increaseTimesFavoured = (recipeId) => {
  const recipeRef = doc(db, `recipes`, recipeId);

  return getDoc(recipeRef)
    .then((doc) => {
      console.log(doc.data());
      return doc.data();
    })
    .then((recipe) =>
      setDoc(recipeRef, {
        ...recipe,
        timesFavoured: recipe.timesFavoured + 1,
      })
    );
};

export const decreaseTimesFavoured = (recipeId) => {
  const recipeRef = doc(db, `recipes`, recipeId);
  return getDoc(recipeRef)
    .then((doc) => doc.data())
    .then((recipe) =>
      setDoc(recipeRef, {
        ...recipe,
        timesFavoured: recipe.timesFavoured - 1,
      })
    );
};

export const toggleFavourites = (userUid, recipeId) => {
  const userRef = doc(db, `users`, userUid);
  return getDoc(userRef)
    .then((doc) => doc.data())
    .then((userData) => {
      if (!userData.favourites.includes(recipeId)) {
        setDoc(userRef, {
          ...userData,
          favourites: [...userData.favourites, recipeId],
        });
        increaseTimesFavoured(recipeId);
      } else {
        setDoc(userRef, {
          ...userData,
          favourites: userData.favourites.filter((fav) => fav !== recipeId),
        });
        decreaseTimesFavoured(recipeId);
      }
    });
};

export const deleteRecipe = (recipeId, userUid) => {
  const recipeRef = doc(db, `recipes`, recipeId);
  deleteDoc(recipeRef);

  //deleting from user.added                                           ovo moze sa onim gore da bude jedan poziv
  const userRef = doc(db, `users`, userUid);
  getDoc(userRef)
    .then((doc) => doc.data())
    .then((user) =>
      setDoc(userRef, {
        ...user,
        added: user.added.filter((id) => id !== recipeId),
      })
    );
};

// ................... Auth .............................
