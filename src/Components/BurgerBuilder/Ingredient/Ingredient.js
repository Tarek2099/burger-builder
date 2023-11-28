import React from "react";
import TopBurger from "../../../Assets/images/top.png";
import Meat from "../../../Assets/images/meat.png";
import Salad from "../../../Assets/images/salad.png";
import Cheese from "../../../Assets/images/cheese.png";
import BottomBurger from "../../../Assets/images/bottom.png";
import "./Ingredient.css"

export const Ingredient = props => {

    let Ingredient = null;

    switch (props.type) {
      case "top-burger":
        Ingredient = (
          <div>
            <img src={TopBurger} alt="top burger"></img>
          </div>
        );
        break;
      case "bottom-burger":
        Ingredient = (
          <div>
            <img src={BottomBurger} alt="bottom burger"></img>
          </div>
        );
        break;
      case "meat":
        Ingredient = (
          <div>
            <img src={Meat} alt="Meat burger"></img>
          </div>
        );
        break;
      case "salad":
        Ingredient = (
          <div>
            <img src={Salad} alt="Salad burger"></img>
          </div>
        );
        break;
      case "cheese":
        Ingredient = (
          <div>
            <img src={Cheese} alt="Cheese burger"></img>
          </div>
        );
        break;
      default:
        Ingredient = null;
    }

    return (
        <div className="ingredient">
            {Ingredient}
        </div>
    )
}