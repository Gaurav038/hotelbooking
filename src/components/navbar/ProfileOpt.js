import React, { useState } from 'react'
import user from "../../images/user.png";
import prof from "../../images/profile.png";
import logout from "../../images/logout.png";
import { Link,  useNavigate } from 'react-router-dom';
import "./profileOpt.css"

function ProfileOpt({userDetail}) {
  const navigate = useNavigate();
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  const logOutFunct = () => {
    localStorage.removeItem('user');
    navigate("/login")
  }

  return (
    <div >
            <img src={userDetail.img ? userDetail.img : prof} className="user-pic" onClick={handleToggle} />

            <div className={isActive ? 'sub-menu-wrap' : 'sub-menu-wrap open-menu'}>

                <div className='sub-menu'>
                    <div className='user-info'>
                        <img src={userDetail.img ? userDetail.img : prof}/>
                        <h2>{userDetail.username}</h2>
                    </div>
                    <hr />

                    <Link to="/profile" className='sub-menu-link'>
                        <img src={prof}/>
                        <p>Booking Details</p>
                        <span> {'>'} </span>
                    </Link>

                    <div onClick={logOutFunct} className='sub-menu-link'>
                        <img src={logout}/>
                        <p>Logout</p>
                        <span> {'>'} </span>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ProfileOpt