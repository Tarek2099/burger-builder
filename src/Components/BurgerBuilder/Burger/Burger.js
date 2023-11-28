import React from "react";
import { Ingredient } from "../Ingredient/Ingredient.js";
import "./Burger.css"

export const Burger = props => {

  let ingredientsArr = props.Ingredient.map(items => {
    let amountArr = [...Array(items.amount).keys()]
    return amountArr.map(() => {
      return <Ingredient type={items.type} key={Math.random()}/>
    })
  })
    .reduce((arr, elements)=> {
  return arr.concat(elements)
    })


  if (ingredientsArr.length === 0) {
    ingredientsArr= <p>Please add some ingredients</p>
  }
    return (
      <div className="container Burger">
        <Ingredient type="top-burger" />
        {ingredientsArr}
        <Ingredient type="bottom-burger" />
      </div>
    );
}