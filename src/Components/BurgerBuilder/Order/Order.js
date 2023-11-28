import React, { Component } from "react";
import { fetchData } from "../../../Redux/actionCreators";
import {connect} from "react-redux"
import { Orders } from "./Order/Orders";
import "./Order.css"
import { Spinner } from "../../Spinner/Spinner.js";


const mapStateToProps = state => {
  return {
    orders: state.orders,
    loadOrders: state.loadOrders,
    orderErrors: state.orderErrors,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData:()=> dispatch(fetchData()),
  }
}

class Order extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    let orders = null;
    if (this.props.orderErrors) {
      orders = <h3 style={{ textAlign: "center" }}>Somthing went wrong</h3>;
    }
    else {
      if (this.props.orders.length === 0) {
        orders= <h2 style={{textAlign: "center"}}>You have no order</h2>
      } else {
          orders = this.props.orders.map((items) => {
            return <Orders orders={items} key={items.id} />;
          });
      }
        
    }

    return (
      <div className="container">
        <h2 className="heading">Orders</h2>
        <div className="orders">
          {this.props.loadOrders? <Spinner/>: orders}
        </div>
      </div>
    );
}

};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
