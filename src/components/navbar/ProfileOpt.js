import React, { useState } from 'react'
import user from "../../images/user.png";
import prof from "../../images/profile.png";
import logout from "../../images/logout.png";
import { Link } from 'react-router-dom';
import "./profileOpt.css"

function ProfileOpt() {

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div >
            <img src={user} className="user-pic" onClick={handleToggle} />

            <div className={isActive ? 'sub-menu-wrap' : 'sub-menu-wrap open-menu'}>

                <div className='sub-menu'>
                    <div className='user-info'>
                        <img src={user}/>
                        <h2>Gaurav</h2>
                    </div>
                    <hr />

                    <Link to="/profile" className='sub-menu-link'>
                        <img src={prof}/>
                        <p>Edit Profile</p>
                        <span> {'>'} </span>
                    </Link>

                    <Link to="/logout" className='sub-menu-link'>
                        <img src={logout}/>
                        <p>Logout</p>
                        <span> {'>'} </span>
                    </Link>
                </div>
            </div>
    </div>
  )
}

export default ProfileOpt