import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, } from "reactstrap";
import "./Header.css"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"



const mapStateToProps = state => {
  return {
    token: state.token,
  }
}


const Header = props => {
let links= null
  if (props.token === null) {
   links=(         <Nav>
              <NavItem>
                {/* <NavLink to="/login">Login</NavLink> */}
              </NavItem>
            </Nav>)
  } else {
links=(              <Nav>
                <NavItem>
                  <NavLink to="/">Burger Builder</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/order">My Order</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/logout">Logout</NavLink>
                </NavItem>
              </Nav>)
}

    return (
      <div>
        <Navbar className="navbar">
          <NavbarBrand href="/" className="navbarbrand_logo">
            <h3>Burger Builder</h3>
          </NavbarBrand>
        {links}
        </Navbar>
      </div>
    );
}

export default connect(mapStateToProps)(Header);