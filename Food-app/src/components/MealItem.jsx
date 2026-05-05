import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";


export default function MealItem({meal}){
    const cartCtx = useContext(CartContext);

    function handleAddMealItem(){
        cartCtx.addItem(meal);
    }

    return(
        <li className="meal-item" >
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meatl-item-description">{meal.description}</p>
                    <p className="meal-item-actions">
                        <Button onClick={handleAddMealItem}>Add To Cart</Button>
                    </p>
                </div>
            </article>
        </li>
    )
}