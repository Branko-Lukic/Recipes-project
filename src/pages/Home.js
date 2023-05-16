import React, { useEffect, useState } from "react";
import Navbar from "../components/common/nav";
import { useLocation } from "react-router-dom";
import { RecipesContainer } from "../components/home/recipesContainer";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes, setSearchParam } from "../store/reducers/recipesSlice";
import { getRecipesByName, getAllRecipes } from "../api";
import { Filter } from "../components/common/filter";
import { PageLayout } from "../components/common/pageLayout";
import { ContentLayout } from "../components/common/contentLayout";

export const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const location = useLocation();

  useEffect(() => {
    const param = location.search.split("=")[1];
    !param
      ? getAllRecipes().then((res) => {
          dispatch(filterRecipes(res));
        })
      : getRecipesByName(param).then((res) => {
          dispatch(filterRecipes(res));
        });
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
