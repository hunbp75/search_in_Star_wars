import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./result.css";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  console.log(id);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      <h1>Star Wars Character</h1>

      {data
        .filter((value) => value.id == id)
        .map((value, key) => {
          return (
            <div key={id} className="container">
              <div className="leftSide">
                <h2>Name: {value.name}</h2>
                <h4>Gender: {value.gender}</h4>
                <h4>HomeWorld: {value.homeworld}</h4>
                <h4>Height: {value.height} cm</h4>
                <h4>Mass: {value.mass} kg</h4>
                <h4>Born: {value.born}</h4>
                <h4>Born Location: {value.bornLocation}</h4>
                <h4>Died: {value.died}</h4>
                <h4>Died Location: {value.diedLocation}</h4>
                <br></br>
                <a href={value.wiki}>Star Wars Wiki Page: </a>
              </div>
              <div className="rightSide">
                <img src={value.image} alt="" />
              </div>
            </div>
          );
        })}

      <button onClick={goBack} className="goBack-btn">
        Back to Home
      </button>
    </div>
  );
};

export default Result;
