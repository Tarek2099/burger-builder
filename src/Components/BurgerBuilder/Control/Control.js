import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import "./Control.css"


    const controls = [
      { label: "Meat", type: "meat" },
      { label: "Salad", type: "salad" },
      { label: "Cheese", type: "cheese" },
    ];
    const BuiltControl = (props) => {
      return (
        <div className="d-flex">
          <div className="me-auto ml-md-5" style={{ fontWeight: "bold" }}>
            {props.label}
          </div>
          <button className="btn btn-danger btn-sm m-1" onClick={props.delete}>
            Less -
          </button>
          <button className="btn btn-success btn-sm m-1" onClick={props.added}>
            More +
          </button>
        </div>
      );
    };

export const Control = props => {

    return (
      <div className="container ml-md-5">
        <Card className="card">
          <CardHeader className="cardheader">
            <h4>Add ingredients</h4>
          </CardHeader>
          <CardBody>
            {controls.map((items) => {
              return (
                <BuiltControl
                  label={items.label}
                  type={items.type}
                  key={Math.random()}
                  added={() => props.addingredients(items.type)}
                  delete={() => props.deleteingredients(items.type)}
                />
              );
            })}
          </CardBody>
          <CardFooter className="footer">
            <h5>Price: {props.priceAdded}$</h5>
          </CardFooter>
          <Button disabled={!props.purchasable} className="orderButton" onClick={props.toggleModal}>Order Now</Button>
        </Card>
      </div>
    );
}