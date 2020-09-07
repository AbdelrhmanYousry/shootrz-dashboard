import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../utils/auth"
import { deleteCookie } from "../utils/cookie"
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  function handleLogout() {
    deleteCookie("shootrz-dashboard-token")
    history.replace("/login")
  }
  return (

    <Navbar light className="bg-light" expand="md">
      <Link to="/" className="navbar-brand">
        dashboard.Shootrz
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <Link to="/events" activeClassName="active" className="nav-link">
              Events
            </Link>
          </NavItem>
          
        </Nav>
        
      </Collapse>
      {isLoggedIn() && (
            <Button color="danger" className=" my-2 my-lg-0" onClick={() => handleLogout()}>
              Logout
            </Button>
          ) }
    </Navbar>
  );
}
