import React, { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import axios from "../axios";
import SmoothImage from 'react-smooth-image';

const MealDetail = ({ selectedMeal }) => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loader = <Spinner />;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`lookup.php?i=${selectedMeal}`)
      .then((result) => {
        setLoading(false);
        if (result.data.meals) setData(result.data.meals[0]);
        else setError(true);
      })
      .catch((error) => setError(true));
  }, [selectedMeal]);

  return (
    <div>
      <div>
        {loading && loader}
        { !loading && <div className="card">
          {/* <img src={data.strMealThumb} className="card-img-top img-thumbnail" alt="..." /> */}
          <div className="card-body">
          <SmoothImage src={data.strMealThumb} className="card-img-top img-thumbnail" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">{data.strMeal}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{data.strCategory}</h6>
            <p className="card-text"> {data.strInstructions} </p>
          </div>
        </div>}
      </div>
      {error && (
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Sorry No meals data found!</h4>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
