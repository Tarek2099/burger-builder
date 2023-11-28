import React from "react";
import "./Orders.css"
import {Table} from "reactstrap"

export const Orders = props => {

  const ingredients = props.orders.Ingredients.map(items => {
    return (
      <span key={items.type} className="span">{items.amount}x {items.type}</span>
    )
  })
    return (
      <div className="container">
        <div className="body">
          <Table responsive>
            <tbody>
              <tr>
                <th scope="row">{props.orders.id}</th>
                <td>
                  {props.orders.Customer.firstName.concat(
                    " ",
                    props.orders.Customer.lastName
                  )}
                </td>
                <td>{props.orders.Customer.deliveryAddress}</td>
                <td>{props.orders.Customer.phone}</td>
                <td>{props.orders.Customer.paymentMethod}</td>
                <td>{ingredients}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
}