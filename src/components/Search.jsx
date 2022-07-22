import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";

const Search = () => {
  const [starWarsData, setStarWarsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // Api adatok lekérése
  useEffect(() => {
    axios
      .get("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => {
        setStarWarsData(response.data);
      });
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = starWarsData.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const onClick = () => {
    navigate({
      pathname: "Result",
      search: createSearchParams({
        id: selected,
      }).toString(),
    });
  };

  console.log(selected);

  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search..."
          autoComplete="on"
          onChange={handleFilter}
        />
        <button type="submit" onClick={onClick}>
          Search
        </button>
      </div>

      {filterData.length !== 0 && (
        <div className="dataResult">
          {filterData.map((item) => {
            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setSelected([item.id]);
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
