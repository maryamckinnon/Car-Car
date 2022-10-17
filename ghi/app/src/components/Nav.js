import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../index.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img className="d-block w-100" src={logo} height={40} alt="logo" />
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="/#"
              >
                Manage Inventory
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/manufacturers/"
                >
                  Manufacturers
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/models/"
                >
                  Vehicle models
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/models/customer/"
                >
                  Vehicle models-customers
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/automobiles/"
                >
                  Automobiles
                </NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="/#"
              >
                Manage Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/technicians/new/"
                >
                  Add technician
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/appointments/"
                >
                  Service appointments
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/appointments/new/"
                >
                  Add service appointment
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/appointments/details/"
                >
                  Appointment history
                </NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="/#"
              >
                Manage Sales
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/sales-person/new"
                >
                  Add sales person
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/customers/new"
                >
                  Add customer
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/sales-records/"
                >
                  All sales records
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/sales-records/new"
                >
                  Add sales record
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/sales-records/filtered/"
                >
                  Search sales records
                </NavLink>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
