import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./index.module.css";
import { getRecipesByName } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchParam } from "../../../../store/reducers/recipesSlice";

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.recipes.filterParams);

  const handleInputChange = (value) => {
    setInput(value);
    setLoading(true);
    !value && dispatch(setSearchParam(""));

    getRecipesByName(value).then((res) => {
      // console.log(res);
      setLoading(false);
      setResults(res);
      // setShowResults(true);
    });
  };

  const handleSearch = () => {
    dispatch(setSearchParam(input));
    const filterQueryString = Object.entries(filterParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    console.log(filterQueryString);

    navigate(
      `/?search=${input}${filterQueryString && `&${filterQueryString}`}`
    );
  };

  const handleOnBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };
  const handleOnFocus = () => {
    setShowResults(true);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          {/* <FaSearch id="search-icon" className={styles.searchIcon} /> */}
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.input}
            type="search"
            placeholder="Search"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        </div>
        <button
          className={styles.button}
          disabled={results.length === 0}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {showResults && (
        <div className={styles.resultsList}>
          {results.length === 0 && input && !loading ? (
            <div>Nema trazenog jela.</div>
          ) : (
            results.map((result, id) => {
              return (
                <div
                  key={id}
                  className={styles.searchResult}
                  onClick={(e) => navigate(`/recipe?recipeId=${result.id}`)}
                >
                  {result.name}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
