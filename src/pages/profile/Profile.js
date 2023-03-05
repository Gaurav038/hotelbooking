import React, { useContext, useEffect } from 'react'
import { Tabs } from "antd";
import { Tag } from "antd";
import Navbar from '../../components/navbar/Navbar';
import "./profile.css"
import { AuthContext } from '../../context/AuthContext';
import MyBooking from './MyBooking';

const { TabPane } = Tabs;

function Profile() {

  const {user} = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className='profile-box'>
        <div className="profile">
          <Tabs defaultActiveKey="1">
            <TabPane tab="My Profile" key="1">
              <div className="Profilerow">
                <div>
                  <div>
                    <p> <b>Name</b> : {user.username}</p>
                    <p> <b>Email</b> : {user.email}</p>
                    <p> <b>city</b> : {user.city}</p>
                    <p> <b>Phone</b> : {user.phone}</p>
                    <p> <b>IsAdmin</b> :{" "}
                      {user.isAdmin ? (
                        <Tag color="green">YES</Tag>
                      ) : (
                        <Tag color="red">NO</Tag>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Booking" key="2">
              <MyBooking />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile