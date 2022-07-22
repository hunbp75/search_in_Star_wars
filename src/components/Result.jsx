import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ide = searchParams.get("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  console.log(ide);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      <h1>Star Wars Character</h1>

      {data
        .filter((value) => value.id == ide)
        .map((value, key) => {
          return (
            <div key={ide} className="container">
              <h4>Name: {value.name}</h4>
              <h5>Gender: {value.gender}</h5>
              <h5>HomeWorld: {value.homeworld}</h5>
              <img src={value.image} alt="" />
            </div>
          );
        })}

      <button onClick={goBack}>Back to Home</button>
    </div>
  );
};

export default Result;
