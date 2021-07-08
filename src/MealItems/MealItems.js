import React, { useEffect, useState } from "react";
import axios from "../axios";

import classes from "./MealItems.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const MealItems = (props) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios.get("filter.php?c=vegetarian").then((result) => {
      if (result.data.meals) {
        const mealData = result.data.meals.slice(0, 6);
        // console.log(mealData);
        setMeals(mealData);
      } else {
        setError(true);
      }
    });
  }, []);

  const showCart = (cartItem) => {
    // console.log(cartItem);
    return setCart((prevCartItems) => ({...prevCartItems, cartItem}));
  }
  
  // console.log('Meals', cart);
  return (
    <>
      <section className={classes.summary}>
        <h4>Delicious Food, Delivered To You</h4>
        <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p> <hr />
        <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
      </section>
      {/* {JSON.stringify(cart, null, 4)} */}
      <section className={classes.meals}>
        {meals && (
          <Card>
            <ul>
              {meals.map((meal) => (
                <MealItem key={meal.idMeal} data={meal} onDisplay={showCart}  />
              ))}
            </ul>
          </Card>
        )}
        {error && (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Sorry No meals found!</h4>
            <p className="mb-0">Please get back to us, we'll have more meals for you</p>
          </div>
        )}
      </section>
    </>
  );
};

export default MealItems;
