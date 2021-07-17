import { useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id: itemId, onAddItems }) => {
  const [amount, setAmount] = useState(1);

  const addItemHandler = (e) => {
    e.preventDefault();
    onAddItems(parseInt(amount));
  };

  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <Input
        label="Amount"
        changed={(e) => setAmount(e.target.value)}
        value={amount}
        input={{
          id: "amount_" + itemId,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit"><i className="fas fa-plus"></i> Add </button>
    </form>
  );
};

export default MealItemForm;
