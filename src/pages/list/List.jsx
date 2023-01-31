import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const {dispatch} = useContext(SearchContext)

 
  const {data, loading, error, reFetch} =  useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 12000}&people=${options.adult || 0}`)
  

  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: { destination, date, options }})
    reFetch()
  }

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
            <button onClick={handleSearch} style={{fontWeight: 600}} >Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" : 
            <>
            {data.map(item => (
              <SearchItem item={item} key={item._id} />
            ))}
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;