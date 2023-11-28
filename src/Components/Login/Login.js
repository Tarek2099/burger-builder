import React, { Component } from "react";
import { Formik } from "formik";
import "./Login.css";
import { Link } from "react-router-dom";
import {auth} from "../../Redux//authActionCreators"
import {connect} from "react-redux"
import { Spinner } from "../Spinner/Spinner";
import { Alert } from "reactstrap";
import { Navigate } from "react-router";


const mapDispatchToProps=dispatch=>{
  return {
  auth: (email, password, mode) => dispatch(auth(email, password, mode))
}
}
const mapStateToProps = state => {
  return {
    authLoading: state.authLoading,
    authFailed: state.authFailed
  }
}

class Login extends Component{
  state = {
    mode: "Sign Up",
  }

  swichHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  }
  render() {
    let err = null;
    if (this.props.authFailed !== null) {
      err = <Alert color="danger">{this.props.authFailed}</Alert>;
    }

    let form = null;
    if (this.props.authLoading) {
      form = <Spinner />
    } else {
      form = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalied email";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 4) {
              errors.password = "Must be 6 word";
            }
            if (this.state.mode === "Sign Up") {
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password does'nt match";
              }
            }

            return errors;
          }}
        >
          
          {({ values, handleChange, handleSubmit, errors }) => (
            <div>
              <form className="login_form" onSubmit={handleSubmit}>
                <h3 className="login">{this.state.mode}</h3>
                <br />
                <input
                  name="email"
                  placeholder="Enter Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span className="errors">{errors.email}</span>
                <br />
                <input
                  name="password"
                  placeholder="Enter Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span className="errors">{errors.password}</span>

                {this.state.mode === "Sign Up" ? (
                  <div>
                    {" "}
                    <br />
                    <input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="errors">{errors.confirmPassword}</span>
                  </div>
                ) : null}
                <br />
                <button type="submit" className="loginSubmit">
                  {this.state.mode}
                </button>
                <br />
                <p>Forgot password</p>
                <Link to="" className="unlinked">
                  Don't have an account?
                  <span onClick={this.swichHandler} className="linked">
                    {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                  </span>
                </Link>
              </form>
            </div>
          )}
        </Formik>
      );
    }
        return (
          <div className="container">
            {err}
         {form}
          </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (Login);