import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [starWarsData, setStarWarsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate({
      pathname: "result",
    });
  };

  const fetchStarWarsData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setStarWarsData(data);
      });
  };

  useEffect(() => {
    fetchStarWarsData("https://akabab.github.io/starwars-api/api/all.json");
  }, []);

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
        <button type="submit">Search</button>
      </div>

      {filterData.length !== 0 && (
        <div className="dataResult">
          {filterData.map((item) => {
            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setSelected([
                      item.name,
                      item.born,
                      item.gender,
                      item.species,
                      item.image,
                    ]);
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
