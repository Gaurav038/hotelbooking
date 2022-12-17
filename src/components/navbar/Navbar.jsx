import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBed} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>lamabooking</span>
            </div>
        </span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar