import { useContext } from "react";
import { currencyFormatter } from "../ult/formatting";
import CartContext from "../store/CartContext";
import Button from "./Button";

export default function MealItem({ meal }) {
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  const cartCtx = useContext(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
