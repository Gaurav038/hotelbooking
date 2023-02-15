import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../Error";
import axios from "axios";
import Loader from "../Loader";
import "./featuredProperties.css";
import {BASE_URL} from "../../API.js"

const FeaturedProperties = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState()

  useEffect(() => {

    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/hotels/favtHotel`)
        setData(res.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, [])

  return (
    <div className="feature-box">
      <div className="fp">
        {loading  ? <Loader /> 
            : error.length > 0 
              ? ( <Error msg={error}></Error>) 
              :<>
                  {data.length && data.map((item) => (
                    <Link to={`/hotels/${item._id}`} className="fpItem" key={item._id}>
                      <img
                        src={item.photos[0]}
                        alt=""
                        className="fpImg"
                      />
                      <span className="fpName">{item.name}, {item.city}</span>
                      <span className="fpPrice">Starting from $ {item.cheapestPrice}</span>
                    
                    </Link> 
                  ))}
                </>
        }
      </div>
    </div>
  );
};

export default FeaturedProperties;