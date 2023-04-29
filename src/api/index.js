export const getAllRecipes = () => {
  return fetch(`http://localhost:8000/recipes`).then((res) => res.json());
};

export const getRecipesByName = (value) => {
  return fetch(`http://localhost:8000/recipes`)
    .then((res) => res.json())
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
};

export const getRecipeById = (id) => {
  return fetch(`http://localhost:8000/recipes?id=${id}`).then((res) =>
    res.json()
  );
};
