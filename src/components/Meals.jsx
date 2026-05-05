import MealItem from "./MealItem";
import Error from "./Error.jsx";
import useHttp from "../hook/useHttp.js";

//Set this to make sure requestConfig is stable object,
//If not, it can trigger unfinity request since requestConfig is dependencies
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching data...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch data" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
