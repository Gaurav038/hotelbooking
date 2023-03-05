import "./list.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import axios from "axios";
import {BASE_URL} from "../../API.js"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from '../../components/footer/Footer'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [type, setType] = useState(location.state.type && location.state.type);
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const {dispatch} = useContext(SearchContext)
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/hotels?city=${destination}&min=${min || 0}&max=${max || 12000}&people=${options.adult || 0}&type=${type || ''}`)
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
    
    dispatch({type: "NEW_SEARCH", payload: { destination, date, options }})
    
  }, [destination, min, max, options,date, type])


  useEffect(() => {
    dispatch({type: "NEW_SEARCH", payload: { destination, date, options }})
  }, [])
  

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} onChange = {e => setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                     onChange={e=>setOptions({adult: e.target.value})}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
              </div>
            </div>
            <button style={{fontWeight: 600}} >Search</button>
          </div>
          <div className="listResult">
            {
              loading 
              ? <Loader /> 
              : error.length > 0 
                  ? ( <Error msg={error}></Error>) 
                  : <>
                      {data && data.map(item => (
                        <SearchItem item={item} key={item._id} />
                      ))}
                    </>
            }
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default List;