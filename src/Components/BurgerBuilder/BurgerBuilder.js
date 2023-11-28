import React, { Component } from "react";
import { Burger } from "./Burger/Burger";
import { Control } from "./Control/Control.js";
import "./BurgerBuilder.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { OrderSummery } from "./OrderSummery/OrderSummery";
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import {
  addingredients,
  removeingredients,
  purchasble,
} from "../../Redux/actionCreators";


const mapStateToProps =state=> {
  return {
    Ingredient: state.Ingredient,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addingredients: types => dispatch(addingredients(types)),
    removeingredients: types => dispatch(removeingredients(types)),
    purchasble: ()=>dispatch(purchasble())
  }
}

 class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  addingredients = (type) => {
    this.props.addingredients(type);
    this.props.purchasble();
  };

  deleteingredients = (type) => {
    this.props.removeingredients(type);
    this.props.purchasble();
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };


  render() {
    return (
      <div>
        <div className=" container d-flex flex-md-row flex-column">
          <Burger Ingredient={this.props.Ingredient} />
          <Control
            addingredients={this.addingredients}
            deleteingredients={this.deleteingredients}
            priceAdded={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your order summery</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice}$</h5>
            <OrderSummery Ingredients={this.props.Ingredient} />
          </ModalBody>
          <ModalFooter>
            <Link
              className="btn-success checkoutBtn"
              to="/checkout"
            >
              Continue to Checkout
            </Link>
            <button
              className="btn-secondary cancelBtn"
              onClick={this.toggleModal}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder)