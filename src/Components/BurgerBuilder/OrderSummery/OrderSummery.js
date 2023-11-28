import React from "react";

export const OrderSummery = props => {
    let OrderSummery = props.Ingredients.map((items) => {
        return (
          <li key={items.type}>
                <span style={{ textTransform: "capitalize" }}>{items.type}</span>: {items.amount}
          </li>
        );
    });
    return (
        <div>
            {OrderSummery}
        </div>
    )
}