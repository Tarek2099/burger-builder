import { connect } from "react-redux";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { logOut } from "../../Redux/authActionCreators";

const mapDispatchToProps = dispatch => {
    return {
      logOut: () => dispatch(logOut()),
    }
}

class Logout extends Component{
    componentDidMount() {
        this.props.logOut()
    }
    render() {
        return (
            <Navigate to="/" />
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);