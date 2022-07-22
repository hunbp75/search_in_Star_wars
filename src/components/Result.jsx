import { useNavigate } from "react-router-dom";

const Result = ({ name }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Result Page !!! {name}</h1>
      <button onClick={goBack}>Back to Home</button>
    </div>
  );
};

export default Result;
