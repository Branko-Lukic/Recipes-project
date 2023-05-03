import React from "react";
import { PageLayout } from "../components/common/pageLayout";
import Navbar from "../components/common/nav";
import { Sidebar } from "../components/profile/sidebar";
import { ContentLayout } from "../components/common/contentLayout";
import { Route, Routes } from "react-router-dom";
import { Overview } from "../components/profile/overview";
import { AddNewRecipe } from "../components/profile/addNewRecipe";
import { NotFound } from "./NotFound";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <PageLayout>
        <Sidebar />
        <ContentLayout>
          <Routes>
            <Route path="/overview" element={<Overview />}></Route>
            <Route path="/add-new-recipe" element={<AddNewRecipe />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ContentLayout>
      </PageLayout>
    </>
  );
};
