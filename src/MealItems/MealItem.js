import { useState } from "react";

import MealItemForm from "./MealItemForm";
import MealDetail from "./MealDetail";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import classes from "./MealItem.module.css";

const MealItem = ({ data: { strMealThumb, strMeal, idMeal }, onDisplay }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [cart, setCart] = useState([]);
  let mealDetail = <Spinner />;
  const [mealDetailDiv, setMealDetailDiv] = useState(mealDetail);

  const getMealInfo = (mealId) => {
    setShowModal(true);
    if (selectedMeal !== mealId) {
      mealDetail = <MealDetail selectedMeal={mealId} />;
      setMealDetailDiv(mealDetail);
    } else setSelectedMeal(mealId);
  };

  const price = idMeal.substr(-2);

  const addItemToCart = (cartItem) => {
    console.log("cartIrem", cartItem);
    const id = cartItem.itemId;
    const itemExists = cart.some(function(el) {
      return el.itemId === id;
    });
    if(itemExists) {
      let items = [...cart];
      const objIndex = items.findIndex((obj => obj.itemId === id));
      items[objIndex].qty += parseInt(cartItem.qty);
      setCart((prevCartItems) => ([...items]));
    } else setCart([...cart, cartItem]);

    onDisplay(cart);
  };

    console.log(cart, 'insider');
  return (
    <li className={classes.meal}>
      {JSON.stringify(cart, null, 4)}
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
        <MealItemForm id={idMeal} name={strMeal} price={price} onAddItems={addItemToCart} />
      </div>
    </li>
  );
};

export default MealItem;
