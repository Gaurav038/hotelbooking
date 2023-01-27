import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const Hotel = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const [hotel, setHotel] = useState()
  const navigate = useNavigate()
  const {dates, options} = useContext(SearchContext)
  const {user} = useContext(AuthContext)

  useEffect(() => {

    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(`/hotels/find/${id}`)
        setHotel(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, [])
  

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dates ? dayDifference(dates[0].endDate, dates[0].startDate) : 1

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

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

  const isAvailable = (roomNumber) => {
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const isFound = roomNumber && roomNumber.some((date) => 
      allDates.includes(new Date(date).getTime())
    )

    return !isFound
  }


  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const onToken = async(token) => {
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const bookingDetails = {
        room : hotel,
            userid: user._id,
            fromdate: dates[0].startDate,
            todate: dates[0].endDate,
            totalAmount : days * hotel.cheapestPrice,
            totaldays: days,
            token,
    };
          
          try {
            setLoading(true);

            const result = await axios.post("/booking/createBooking", bookingDetails);
            
            const res = await axios.put(`/hotels/availability/${id}`, {dates: allDates})
            setLoading(false);
            Swal.fire(
              "Congratulations",
              "Your Room Booked Successfully",
              "success"
            ).then((result) => {
              window.location.href = "/";
            });
          } catch (error) {
            setError(error);
            Swal.fire("Opps", "Error:" + error, "error");          
          }
          setLoading(false);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ?
        <Loader /> :
        error.length > 0 ? (
          <Error msg={error}></Error>
        ) : 
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotel.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {hotel.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel.title}</h1>
                <p className="hotelDesc">
                  {hotel.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * hotel.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
               
                
                {
                  isAvailable(hotel.rooms_unavailableDates)
                    ? <StripeCheckout
                      amount={days * hotel.cheapestPrice * 100}
                      token={onToken}
                      currency='INR'
                      stripeKey="pk_test_51JkQ5ESHQQudBigup4PaaK2bx5vQdNq1ZQ4XZ5fFYxXV0SlqFuLyfoZXURjK0u9e1PWM41JQuhqdyFiRQpdoZFHX00JE1TQJUT"
                    />
                    : <button >Sorry!!  Already Booked</button>
                }
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      }

    </div>
  );
};

export default Hotel;