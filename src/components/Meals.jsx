import { useState, useEffect } from "react";
import MealIteam from "./MeallItem";

export default function Meals() {
  const [loadMeals, setLoadMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        //...return error code
      }

      const meals = await response.json();
      setLoadMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <MealIteam meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
