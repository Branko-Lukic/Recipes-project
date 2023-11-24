import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterParams } from "../../../store/reducers/recipesSlice";
import styles from "./index.module.css";
import { MdTune } from "react-icons/md";
import Multiselect from "multiselect-react-dropdown";
import { getIngredientTags } from "../../../api";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Filter = ({ filterData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParam = useSelector((state) => state.recipes.searchParam);

  const [filterActive, setFilterActive] = useState(false);
  const [openBtnActive, setOpenBtnActive] = useState(true);

  const [ingTags, setIngTags] = useState([]);

  const [selectedIngTags, setSelectedIngTags] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedServings, setSelectedServings] = useState("");
  const [filterButtonDisabled, setFilterButtonDisabled] = useState("");

  const ingTagRef = useRef();
  const timeRef = useRef();
  const diffRef = useRef();
  const servRef = useRef();

  const timeArr = [
    "Under 15 minutes",
    "Under 30 minutes",
    "Under 45 minutes",
    "Under 1 hour",
    "1 hour or more",
  ];
  const difficultyArr = ["Easy", "More effort", "A challenge"];
  const servingsArr = [
    "1 serving",
    "2 servings",
    "3 servings",
    "4 servings",
    "5 servings",
    "6 servings",
    "6+ servings",
  ];

  const toggleFilter = filterActive ? `` : `${styles.filterClosed}`;

  const handleFilterBtn = () => {
    setFilterActive(!filterActive);
    setOpenBtnActive(!openBtnActive);
    filterData && filterData(!filterActive);
  };
  useEffect(() => {
    getIngredientTags().then((res) => setIngTags(res));
  }, []);

  const resetFieldsAndStates = () => {
    dispatch(setFilterParams({}));

    setSelectedIngTags([]);
    setSelectedTime("");
    setSelectedDifficulty("");
    setSelectedServings("");
    ingTagRef.current.resetSelectedValues();
    timeRef.current.resetSelectedValues();
    diffRef.current.resetSelectedValues();
    servRef.current.resetSelectedValues();
  };

  useEffect(() => {
    console.log(selectedIngTags);
    setFilterButtonDisabled(
      () =>
        selectedIngTags.length === 0 &&
        !selectedTime &&
        !selectedDifficulty &&
        !selectedServings
    );
  }, [
    selectedIngTags.length,
    selectedTime,
    selectedDifficulty,
    selectedServings,
  ]);

  const handleSearchBtn = () => {
    const params = {
      ings: selectedIngTags.join(","),
      time: selectedTime,
      difficulty: selectedDifficulty,
      servings: selectedServings,
    };

    dispatch(setFilterParams(params));

    const filterQueryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    navigate(`/?search=${searchParam}&${filterQueryString}`);
  };

  return (
    <>
      <div className={`${styles.filter} ${toggleFilter}`}>
        <span className={styles.close} onClick={handleFilterBtn}>
          <MdTune />
        </span>
        {!filterActive && openBtnActive && (
          <span className={styles.open} onClick={handleFilterBtn}>
            <MdTune />
          </span>
        )}

        <div className={styles.ingTagsContainer}>
          <Multiselect
            className={styles.multiselectContainer}
            isObject={false}
            options={ingTags}
            placeholder="Search ingredients"
            avoidHighlightFirstOption
            emptyRecordMsg="No ingredients available"
            closeOnSelect={false}
            selectionLimit="5"
            ref={ingTagRef}
            onRemove={(e) => {
              setSelectedIngTags([...e]);
            }}
            onSelect={(e) => {
              setSelectedIngTags([...e]);
            }}
            style={{
              chips: {
                background: "red",
                fontSize: "12px",
              },
              multiselectContainer: {
                color: "rgb(90, 90, 90)",
              },
              searchBox: {
                border: "none",
                borderBottom: "2px solid rgb(150,150,150)",
                borderRadius: "0px",
              },
              optionContainer: {
                maxHeight: "120px",
                borderTop: "none",
                borderTopLeftRadius: "0px",
                fontSize: "15px",
              },
              option: {
                padding: "3px 10px",
              },
            }}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
        <div className={styles.timeContainer}>
          <Multiselect
            className={styles.multiselectContainer}
            isObject={false}
            options={timeArr}
            placeholder="Select time"
            avoidHighlightFirstOption
            singleSelect
            ref={timeRef}
            customCloseIcon={<></>}
            onSelect={(e) => {
              setSelectedTime(...e);
            }}
            style={{
              multiselectContainer: {
                color: "rgb(90,90,90)",
              },
              chips: {
                fontSize: "14px",
              },

              searchBox: {
                border: "none",
                borderBottom: "2px solid rgb(150,150,150)",
                borderRadius: "0px",
                color: " rgb(90, 90, 90)",
              },

              optionContainer: {
                // border: "1px solid blue",
                maxHeight: "120px",
                borderTop: "none",
                borderTopLeftRadius: "0px",
                fontSize: "15px",
              },
              option: {
                // height: "40px",
                padding: "3px 10px",
              },
            }}
          />
        </div>
        <div className={styles.difficultyContainer}>
          <Multiselect
            className={styles.multiselectContainer}
            isObject={false}
            options={difficultyArr}
            placeholder="Select difficulty"
            avoidHighlightFirstOption
            singleSelect
            customCloseIcon={<></>}
            ref={diffRef}
            onSelect={(e) => {
              setSelectedDifficulty(...e);
            }}
            style={{
              multiselectContainer: {
                color: "rgb(90, 90, 90)",
              },
              chips: {
                fontSize: "14px",
              },
              searchBox: {
                border: "none",
                borderBottom: "2px solid rgb(150,150,150)",
                borderRadius: "0px",
                color: " rgb(90, 90, 90)",
              },

              optionContainer: {
                // border: "1px solid blue",
                maxHeight: "120px",
                borderTop: "none",
                borderTopLeftRadius: "0px",
                fontSize: "15px",
              },
              option: {
                // height: "40px",
                padding: "3px 10px",
              },
            }}
          />
        </div>
        <div className={styles.servingsContainer}>
          <Multiselect
            className={styles.multiselectContainer}
            isObject={false}
            options={servingsArr}
            placeholder="Select servings"
            avoidHighlightFirstOption
            singleSelect
            customCloseIcon={<></>}
            ref={servRef}
            onSelect={(e) => {
              setSelectedServings(...e);
            }}
            style={{
              multiselectContainer: {
                color: "rgb(90, 90, 90)",
              },
              chips: {
                fontSize: "14px",
              },
              searchBox: {
                border: "none",
                borderBottom: "2px solid rgb(150,150,150)",
                borderRadius: "0px",
                color: " rgb(90, 90, 90)",
              },

              optionContainer: {
                // border: "1px solid blue",
                maxHeight: "120px",
                borderTop: "none",
                borderTopLeftRadius: "0px",
                fontSize: "15px",
              },
              option: {
                // height: "40px",
                padding: "3px 10px",
              },
            }}
          />
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.resetBtn} onClick={resetFieldsAndStates}>
            Reset fields
          </button>
          <button
            className={styles.filterBtn}
            onClick={handleSearchBtn}
            disabled={filterButtonDisabled}
          >
            Filter
          </button>
        </div>
      </div>
      {/* {!filterActive && openBtnActive && (
        <span className={styles.open} onClick={handleClick}>
          <MdTune />
        </span>
      )} */}
    </>
  );
};
