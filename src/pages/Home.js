import React, { useEffect, useState } from "react";
import Navbar from "../components/common/nav";
import { useLocation } from "react-router-dom";
import { RecipesContainer } from "../components/home/recipesContainer";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes, setSearchParam } from "../store/reducers/recipesSlice";
import { getRecipesByName, getAllRecipes, getFilteredRecipe } from "../api";
import { Filter } from "../components/common/filter";
import { PageLayout } from "../components/common/pageLayout";
import { ContentLayout } from "../components/common/contentLayout";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const recipes = useSelector((state) => state.recipes);

  const queryParams = new URLSearchParams(location.search);

  // useEffect(() => {
  //   const search = queryParams.get("search");
  //   const ingTags = queryParams.get("ings")?.split(",");
  //   const time = queryParams.get("time");
  //   const difficulty = queryParams.get("difficulty");
  //   const servings = queryParams.get("servings");

  //   // let recipesRef = collection(db, "recipes");

  //   const params = location.search;
  //   !params
  //     ? getAllRecipes().then((res) => {
  //         dispatch(filterRecipes(res));
  //       })
  //     : getRecipesByName(params).then((res) => {
  //         dispatch(filterRecipes(res));
  //       });

  //   console.log(search, ingTags, time, difficulty, servings);
  //   console.log(params);
  // }, [location.search]);

  useEffect(() => {
    const search = queryParams.get("search");
    const ingTags = queryParams.get("ings")
      ? queryParams.get("ings").split(",")
      : undefined;
    const time = queryParams.get("time");
    const difficulty = queryParams.get("difficulty");
    const servings = queryParams.get("servings");

    // console.log(
    //   search,
    //   `,`,
    //   ingTags,
    //   `,`,
    //   time,
    //   `,`,
    //   difficulty,
    //   `,`,
    //   servings
    // );

    getFilteredRecipe(search, ingTags, time, difficulty, servings).then(
      (recipes) => {
        dispatch(filterRecipes(recipes));
        // console.log(recipes);
      }
    );
  }, [location.search]);

  useEffect(() => {
    dispatch(setSearchParam(""));
  }, []);

  //...............
  const [filterState, setFilterState] = useState(false);
  const handleFilterState = (data) => {
    setFilterState(data);
  };
  // console.log(filterState);

  return (
    <>
      <Navbar />
      <PageLayout>
        <Filter filterData={handleFilterState} />
        {/* <Filter /> */}
        <ContentLayout>
          {recipes.filtered.length > 0 ? (
            <RecipesContainer
              filterProp={filterState}
              searchedRecipes={recipes.filtered}
            />
          ) : (
            <div style={{ marginTop: "200px" }}>
              Nijesmo nasli nista za tu pretragu.
            </div>
          )}
        </ContentLayout>
      </PageLayout>
    </>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/common/nav";
// import { useLocation } from "react-router-dom";
// import { RecipesContainer } from "../components/home/recipesContainer";
// import { useDispatch, useSelector } from "react-redux";
// import { filterRecipes, setSearchParam } from "../store/reducers/recipesSlice";
// import { getDocs, collection, query, where } from "firebase/firestore";
// import { db } from "../firebase/config";
// import { Filter } from "../components/common/filter";
// import { PageLayout } from "../components/common/pageLayout";
// import { ContentLayout } from "../components/common/contentLayout";

// export const Home = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const recipes = useSelector((state) => state.recipes);

//   const queryParams = new URLSearchParams(location.search);

//   useEffect(() => {
//     const search = queryParams.get("search");
//     const ingTags = queryParams.get("ings")?.split(",");
//     const time = queryParams.get("time");
//     const difficulty = queryParams.get("difficulty");
//     const servings = queryParams.get("servings");

//     let recipesRef = collection(db, "recipes");

//     // const searchLowerCase = search?.toLowerCase();
//     // if (search) {
//     //   recipesRef = query(
//     //     recipesRef,
//     //     where("name", ">=", searchLowerCase),
//     //     where("name", "<=", searchLowerCase + "\uf8ff")
//     //   );
//     // }

//     // Apply ingTags parameter
//     if (ingTags && ingTags.length > 0) {
//       recipesRef = query(
//         recipesRef,
//         where("ingTags", "array-contains-any", ingTags)
//       );
//     }

//     // Apply time parameter
//     // if (time) {
//     //   const timeNum = time.match(/\d+/)[0];
//     //   recipesRef = query(recipesRef, where("requiredTime", "<=", timeNum));
//     // }

//     // // Apply difficulty parameter
//     // if (difficulty) {
//     //   recipesRef = query(recipesRef, where("difficulty", "==", difficulty));
//     // }

//     // // Apply servings parameter
//     // if (servings) {
//     //   recipesRef = query(recipesRef, where("servings", "==", servings));
//     // }

//     getDocs(recipesRef)
//       .then((snapshot) => {
//         const results = snapshot.docs.map((doc) => doc.data());
//         // const filteredResults = results.filter((recipe) =>
//         //   recipe.name.toLowerCase().includes(searchLowerCase)
//         // );
//         // console.log(snapshot.docs);
//         dispatch(filterRecipes(results));
//       })
//       .catch((error) => {
//         console.error("Error getting recipes:", error);
//       });
//   }, [location.search, dispatch]);

//   useEffect(() => {
//     dispatch(setSearchParam(""));
//   }, [dispatch]);

//   const [filterState, setFilterState] = useState(false);
//   const handleFilterState = (data) => {
//     setFilterState(data);
//   };

//   return (
//     <>
//       <Navbar />
//       <PageLayout>
//         <Filter filterData={handleFilterState} />
//         {/* <Filter /> */}
//         <ContentLayout>
//           {recipes.filtered.length > 0 ? (
//             <RecipesContainer
//               filterProp={filterState}
//               searchedRecipes={recipes.filtered}
//             />
//           ) : (
//             <div style={{ marginTop: "200px" }}>
//               Nijesmo nasli nista za tu pretragu.
//             </div>
//           )}
//         </ContentLayout>
//       </PageLayout>
//     </>
//   );
// };
