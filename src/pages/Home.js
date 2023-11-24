import React, { useEffect, useState } from "react";
import Navbar from "../components/common/nav";
import { useLocation } from "react-router-dom";
import { RecipesContainer } from "../components/home/recipesContainer";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes, setSearchParam } from "../store/reducers/recipesSlice";
import { getFilteredRecipe } from "../api";
import { Filter } from "../components/common/filter";
import { PageLayout } from "../components/common/pageLayout";
import { ContentLayout } from "../components/common/contentLayout";
import { WelcomeMessage } from "../components/home/welcomeMessage";
import { ClipLoader } from "react-spinners";
import { MdSearchOff } from "react-icons/md";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const recipes = useSelector((state) => state.recipes);
  const queryParams = new URLSearchParams(location.search);

  const user = useSelector((state) => state.auth.currentUser);

  const style = {
    marginTop: "250px",
    textAlign: "center",
  };

  useEffect(() => {
    const search = queryParams.get("search");
    const ingTags = queryParams.get("ings")
      ? queryParams.get("ings").split(",")
      : undefined;
    const time = queryParams.get("time");
    const difficulty = queryParams.get("difficulty");
    const servings = queryParams.get("servings");

    getFilteredRecipe(search, ingTags, time, difficulty, servings).then(
      (recipes) => {
        dispatch(filterRecipes(recipes));
      }
    );
  }, [location.search]);

  useEffect(() => {
    dispatch(setSearchParam(""));
  }, []);

  const [filterState, setFilterState] = useState(false);
  const handleFilterState = (data) => {
    setFilterState(data);
  };

  return (
    <>
      <Navbar />
      <PageLayout>
        <Filter filterData={handleFilterState} />
        <ContentLayout>
          {user === undefined ? "" : <WelcomeMessage />}
          {recipes.filtered.length > 0 ? (
            <RecipesContainer
              filterProp={filterState}
              searchedRecipes={recipes.filtered}
            />
          ) : user === undefined ? (
            <div style={style}>
              <ClipLoader size={80} color="red" />
            </div>
          ) : (
            <div
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginTop: "150px",
                marginLeft: "400px",
              }}
            >
              No recipes <MdSearchOff style={{ fontSize: "4rem" }} />
            </div>
          )}
        </ContentLayout>
      </PageLayout>
    </>
  );
};
