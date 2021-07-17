import { useState, useContext } from "react";

import MealItemForm from "./MealItemForm";
import MealDetail from "./MealDetail";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import classes from "./MealItem.module.css";
import CartContext from "../store/cart-context";

const MealItem = ({ data: { strMealThumb, strMeal, idMeal } }) => {

  const cartCtx = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  let mealDetail = <Spinner />;
  const [mealDetailDiv, setMealDetailDiv] = useState(mealDetail);

  const price = idMeal.substr(-2);

  const getMealInfo = (mealId) => {
    setShowModal(true);
    if (selectedMeal !== mealId) {
      mealDetail = <MealDetail selectedMeal={mealId} />;
      setMealDetailDiv(mealDetail);
    } else setSelectedMeal(mealId);
  };

  const addToCartHandler = amount => {
  cartCtx.addItem({id: idMeal, name: strMeal, amount: amount, price: price  });
  }


  return (
    <li className={classes.meal}>
      {showModal && (
        <Modal title={strMeal} onConfirm={() => setShowModal(false)}>
          {mealDetailDiv}
        </Modal>
      )}
      <div onClick={() => getMealInfo(idMeal)}>
        <img src={strMealThumb} alt={strMeal} />
        <h5>{strMeal}</h5>
        <div className={classes.price}>${price}</div>
      </div>
      <div>
        <MealItemForm id={idMeal} onAddItems={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
