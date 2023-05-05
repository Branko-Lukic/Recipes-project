import React, { useEffect } from "react";
import { SingleRecipe } from "../components/recipe/singleRecipe";
import Navbar from "../components/common/nav";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../api";
import { ClipLoader } from "react-spinners";
import {
  addSelected,
  startLoading,
  finishLoading,
  setError,
} from "../store/reducers/recipesSlice";
import { Filter } from "../components/common/filter";
import { PageLayout } from "../components/common/pageLayout";
import { ContentLayout } from "../components/common/contentLayout";

export const Recipe = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedRecipe = useSelector((state) => state.recipes.selected);
  const loading = useSelector((state) => state.recipes.loading);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    const param = location.search.split(`=`)[1];
    dispatch(startLoading());
    getRecipeById(param)
      .then((res) => {
        dispatch(finishLoading());
        dispatch(addSelected(res));
      })
      .catch((err) => {
        dispatch(finishLoading());
        dispatch(setError(err.message));
      });
  }, [location.search]);

  return (
    <>
      <Navbar />
      <PageLayout>
        <Filter />
        <ContentLayout>
          {loading ? (
            <div style={{ marginTop: "200px" }}>
              <ClipLoader color="#36d7b7" />
            </div>
          ) : (
            <SingleRecipe selectedRecipe={selectedRecipe}></SingleRecipe>
          )}
          {error && <div style={{ marginTop: "200px" }}>{error}</div>}
        </ContentLayout>
      </PageLayout>
    </>
  );
};
