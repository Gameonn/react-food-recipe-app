import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import MealItems from "./MealItems/MealItems";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      {showCart && <Cart onClose={() => setShowCart(false)} />}
      <Header onShow={() => setShowCart(true)} />
      <MealItems />
    </CartProvider>
  );
}

export default App;
