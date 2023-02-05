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
                  src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
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
                  src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
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