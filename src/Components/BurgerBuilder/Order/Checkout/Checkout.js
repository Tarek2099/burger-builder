import React, { Component } from "react";
import { Form, Modal, ModalBody } from "reactstrap";
import "./Checkout.css"
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import axios from "axios"
import { Spinner } from "../../../Spinner/Spinner";
import { resetIngredient } from "../../../../Redux/actionCreators";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

const mapStateToProps = state => {
  return {
    Ingredient: state.Ingredient,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetIngredient: ()=>dispatch(resetIngredient()),
  }
}
class Checkout extends Component {
  state = {
    values: {
      firstName: "",
      lastName: "",
      deliveryAddress: "",
      phone: "",
      paymentMethod: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
  };

  handleInput = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleSubmit = (e) => {
    this.setState({
      values: {
        firstName: "",
        lastName: "",
        deliveryAddress: "",
        phone: "",
        paymentMethod: "Cash On Delivery",
      },
      isLoading: true,
    });

    const order = {
      Ingredients: this.props.Ingredient,
      Customer: this.state.values,
      Price: this.props.totalPrice,
      Date: new Date(),
    };
    axios
      .post(
        "https://burger-builder-36045-default-rtdb.firebaseio.com/orders.json",
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: " Order Successfull",
          });
          this.props.resetIngredient();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something wrong",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something wrong",
        });
      });
    e.preventDefault();
  };

  goTomyOrders = () => {
<Navigate to="/order" replace={true} />;
  };
  render() {
    let form = (
      <div>
        {" "}
        <Form>
          <div className="d-flex">
            <h4 className="amount">Total amount</h4>
            <br />
            <h4 className="price">{this.props.totalPrice}$</h4>
          </div>
          <input
            name="firstName"
            value={this.state.values.firstName}
            placeholder="First Name"
            className="form-control"
            onChange={this.handleInput}
          ></input>
          <br />
          <input
            name="lastName"
            value={this.state.values.lastName}
            placeholder="Last Name"
            className="form-control"
            onChange={this.handleInput}
          ></input>
          <br />
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            placeholder="Your Delivery Address"
            className="form-control"
            onChange={this.handleInput}
          ></textarea>
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            placeholder="Your Phone Number"
            className="form-control"
            onChange={this.handleInput}
          ></input>
          <br />
          <select
            name="paymentMethod"
            value={this.state.values.paymentMethod}
            className="form-control"
            onChange={this.handleInput}
          >
            <option>Cash On Delivery</option>
            <option>Bkash</option>
          </select>
          <br />
          <button
            className="btn-success payment_btn"
            onClick={this.handleSubmit}
            disabled={!this.props.purchasable}
          >
            Continue to Payment
          </button>
          <Link className="btn-danger ms-1 back_btn" to="/">
            Back
          </Link>
        </Form>
      </div>
    );
    return (
      <div className="container payment-form">
        <div className="row">
          <div className="col-4 offset-md-4">
            {this.state.isLoading ? <Spinner /> : form}
            <Modal isOpen={this.state.isModalOpen}>
              <ModalBody className="d-flex">
                <p>{this.state.modalMsg}</p>
                <Link className="myOrders" to="/order">
                  My Orders
                </Link>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Checkout);