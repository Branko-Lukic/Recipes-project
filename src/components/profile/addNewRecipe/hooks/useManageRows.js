import { useState } from "react";

export const useManageRows = () => {
  const randomNum = () => Math.floor(Math.random() * 100000);
  const [ingRow, setIngRow] = useState([{ id: randomNum() }]);
  const [prepStep, setPrepStep] = useState([{ id: randomNum() }]);

  const addNewIngRow = () => {
    setIngRow((ingRow) => [...ingRow, { id: randomNum() }]);
  };

  const deleteIngRow = (id) => {
    setIngRow((ingRow) => ingRow.filter((row) => row.id !== id));
  };

  const addNewPrepStep = () => {
    setPrepStep((prepStep) => [...prepStep, { id: randomNum() }]);
  };

  const deletePrepStep = (id) => {
    setPrepStep((prepStep) => prepStep.filter((step) => step.id !== id));
  };

  return [
    { ingRow, prepStep },
    { addNewIngRow, deleteIngRow, addNewPrepStep, deletePrepStep },
  ];
};
