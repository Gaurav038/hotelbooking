import "./featured.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../Error";
import axios from "axios";
import Loader from "../Loader";
import {BASE_URL} from "../../API.js"

const Featured = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState()

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {

    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/hotels/countByCity?cities=delhi,mumbai,pune`)
        setData(res.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, [])

 const handleSearch = (destination) => {
    if(destination){
      navigate("/hotels", { state: { destination, date, options } });
    }
 }
    
  
  return (
    <div className="featured">
      {loading 
          ? <Loader /> 
          : error.length > 0 
            ? ( <Error msg={error}></Error>) 
            :<>
              <div className="featuredItem" onClick={()=>handleSearch('delhi')} >
                <img
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Delhi</h1>
                  <h2>{data[0]} properties</h2>
                </div>
              </div>
              
              <div className="featuredItem" onClick={()=>handleSearch('mumbai')}>
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Mumbai</h1>
                  <h2>{data[1]} properties</h2>
                </div>
              </div>
              <div className="featuredItem" onClick={()=>handleSearch('pune')}>
                <img
                  src="https://images.unsplash.com/photo-1553064483-f10fe837615f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Pune</h1>
                  <h2>{data[2]} properties</h2>
                </div>
              </div> 
            </>
      }
    </div>
  );
};

export default Featured;