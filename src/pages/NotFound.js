import React from "react";
import { TbMoodSadDizzy } from "react-icons/tb";
import { BackToHome } from "../components/common/backToHome";

export const NotFound = () => {
  const text = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "250px",
    // alignItems: "center",
    fontSize: "3rem",
  };

  const icon = {
    fontSize: "4rem",
    marginLeft: "20px",
  };

  return (
    <div>
      <BackToHome />

      <div style={text}>
        Page not found <TbMoodSadDizzy style={icon} />
      </div>
    </div>
  );
};
