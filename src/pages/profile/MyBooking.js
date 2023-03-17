import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Tag } from "antd";
import "./MyBooking.css"
import Swal from "sweetalert2";
import moment from "moment"
import {BASE_URL} from "../../API.js"

function MyBooking() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const {user} = useContext(AuthContext)

  async function fetchMyAPI() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post(`${BASE_URL}/booking/getbookingbyuserid`, {
                      userid: user._id,
                    })).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);
  

  const getDatesInRange = (startDate, endDate) => {
   
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  async function cancelBooking(bookingid, roomid, startdate, enddate){
    setError("");
    setLoading(true);

    const dateslist = getDatesInRange(startdate, enddate)
    try {
      await axios.post(`${BASE_URL}/booking/cancelbooking`, {
        bookingid, roomid, dateslist
      }
      , {withCredentials: true, credentials: 'include'});
      setLoading(false)

      Swal.fire(
        "Congratulations",
        "Your Room Cancelled Successfully", "success"
      ).then((result) => {
        fetchMyAPI();
      })
    } catch (error) {
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  }

  return (
    <div className="myBooking">
        {loading  
          ? <Loader />
          : error.length > 0 
            ? <Error msg={error} />
            : <div>
                <div>
                  {bookings && 
                    bookings.map((booking) => {
                      return (
                        <div className="detailsBox" key={booking._id} >
                            <h1>{booking.room}</h1>
                            <p> <b>BookingId:</b> {booking._id} </p>
                            <p> <b>CheckIn:</b> {moment(booking.fromdate).format('DD-MM-YYYY')} </p>
                            <p> <b>CheckOut:</b> {moment(booking.todate).format('DD-MM-YYYY')} </p>
                            <p> <b>Amount:</b> {booking.totalamount} </p>
                            <p> <b>Status:</b>{" "}
                                {booking.status === "booked" ? (
                                  <Tag color="green">CONFIRMED</Tag>
                                ) : (
                                  <Tag color="red">CANCELLED</Tag>
                                )}
                            </p>
                            {booking.status === "booked" && (
                              <div style={{textAlign : 'right'}}>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    cancelBooking(booking._id, booking.roomid, booking.fromdate, booking.todate);
                                  }}
                                >
                                  Cancel Booking
                                </button>
                              </div>
                            )}
                        </div>
                      )
                    })

                  }
                </div>
             </div>
        }
    </div>
  )
}

export default MyBooking