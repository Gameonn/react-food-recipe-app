import React, { useEffect, useState } from "react";
import axios from "../axios";
import Spinner from "../UI/OrbitSpinner";

import classes from "./MealItems.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const MealItems = (props) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("filter.php?c=vegetarian").then((result) => {
      if (result.data.meals) {
        const mealData = result.data.meals.slice(0, 6);
        setMeals(mealData);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      } 
    }).catch(error => {
      setError(true);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className={classes.summary}>
        <h4>Delicious Food, Delivered To You</h4>
        <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p> <hr />
        <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
      </section>
      <section className={classes.meals}>

        {loading && (<Spinner />) }

        {meals && (
          <Card>
            <ul>
              {meals.map((meal) => (
                <MealItem key={meal.idMeal} data={meal}  />
              ))}
            </ul>
          </Card>
        )}
        {error && (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Sorry No meals found!</h4>
            <p className="mb-0">Please get back to us later, we'll have more meals for you</p>
          </div>
        )}
      </section>
    </>
  );
};

export default MealItems;
