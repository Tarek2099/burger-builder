import React, { Component } from "react";
import BurgerBuilder  from "./BurgerBuilder/BurgerBuilder.js";
import Header  from "./Header/Header";
import  Checkout from "../Components/BurgerBuilder/Order/Checkout/Checkout"
import  Order from "./BurgerBuilder/Order/Order";
import { Route, Routes } from "react-router";
import Login from "./Login/Login.js";
import { connect } from "react-redux";
import { authCheck } from "../Redux/authActionCreators.js";
import Logout from "./Login/Logout.js";
import { Navigate } from "react-router-dom";




const mapStateToProps = state => {
  return {
    token: state.token,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(authCheck())
  }
}

class  Main extends Component {
  componentDidMount() {
    this.props.authCheck()
}
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      );
    }

    return (
      <div>
        <Header />
        {routes}
      </div>
    );
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Main)