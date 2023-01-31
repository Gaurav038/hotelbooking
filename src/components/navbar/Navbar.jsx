import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBed} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileOpt from "./ProfileOpt";

const Navbar = () => {

  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/" style={{color: "inherit", textDecoration: "none"}} >
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} /> {" "}
              <span>Your Hotel</span>
            </div>
          </Link>   
        </span>
        {
        user ? <ProfileOpt userDetail = {user} /> 
        : <div className="navItems">
            <Link to = "/"><button className="navButton">Register</button></Link>
            <Link to = "/login"><button className="navButton">Login</button></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar