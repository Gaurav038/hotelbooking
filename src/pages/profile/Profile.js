import React, { useContext, useEffect } from 'react'
import { Tabs } from "antd";
import { Tag } from "antd";
import Navbar from '../../components/navbar/Navbar';
import "./profile.css"
import { AuthContext } from '../../context/AuthContext';

const { TabPane } = Tabs;

function Profile() {

  const {user} = useContext(AuthContext)

  console.log(user)
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>

      <Navbar />
      <div className="profile">
        <Tabs defaultActiveKey="1">
          <TabPane tab="My Profile" key="1">
            <div className="row">
              <div className="col-xs-12 ml-5 mb-5">
                <div className="bs">
                  <p>Name : {user.username}</p>
                  <p>Email : {user.email}</p>
                  <p>
                    IsAdmin :{" "}
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
            <div>okkkkkkkkkkkkkkkkkk</div>
          </TabPane>
        </Tabs>
      </div>

    </div>
  )
}

export default Profile