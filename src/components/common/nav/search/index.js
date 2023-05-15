import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./index.module.css";
import { getRecipesByName } from "../../../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setInput(value);
    setLoading(true);

    getRecipesByName(value).then((res) => {
      // console.log(res);
      setLoading(false);
      setResults(res);
      // setShowResults(true);
    });
  };

  const handleSearch = () => navigate(`/?search=${input}`);

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
          <FaSearch id="search-icon" className={styles.searchIcon} />
          <input
            className={styles.input}
            type="search"
            placeholder="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
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
