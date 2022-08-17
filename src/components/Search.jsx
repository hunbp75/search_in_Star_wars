import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [starWarsData, setStarWarsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();

  console.log("idSelected: ", selected);

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

  return (
    <div>
      {/* Search bar */}
      <div className="search">
        <h1>Star Wars Character - Search</h1>
        <div className="input-container">
          <input
            className="searchInput"
            type="text"
            placeholder={selectedName ? selectedName : "typing the name"}
            autoComplete="on"
            onChange={handleFilter}
          />
          <button type="submit" onClick={onClick} className="search-btn">
            Click
          </button>
        </div>
        {filterData.length !== 0 && (
          <div className="dataResult">
            {filterData.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    className="dataItem"
                    onClick={() => {
                      setSelected(item.id);
                      setSelectedName(item.name);
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

      {/* pictures on the page */}
      <div className="searchPicturesMainContainer">
        {filterData.map((pictures) => {
          return (
            <div className="searchPicturesContainer" key={pictures.id}>
              <p>{pictures.name}</p>
              <img
                className="searchPictures"
                src={pictures.image}
                alt=""
                onClick={() => {
                  setSelected(pictures.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
