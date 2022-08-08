import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AddUser from "../users/AddUser";
import { useNavigate } from "react-router-dom";

const Header = ({ setlogout }) => {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token")
    setlogout(null);
    navigate('/')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid ms-auto">
          <NavLink className="navbar-brand " to="/">
            <i class="fab fa-angellist"></i> Welcome{}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li> */}
            </ul>
            <div className=" ">
              <AddUser />
            </div>
            <div
              style={
                {
                  // color: "white",
                  // // padding: " 15px 50px 5px 50px",
                  // float: "right",
                  // fontsize: "16px",
                }
              }
            >
              <button
                onClick={logout}
                class="btn btn-danger square-btn-adjust m-2"
              >
                <i class="fas fa-sign-out-alt"> Logout</i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
