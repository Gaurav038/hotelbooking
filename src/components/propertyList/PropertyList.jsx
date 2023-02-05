import "./propertyList.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../Error";
import axios from "axios";
import Loader from "../Loader";
import {BASE_URL} from "../../API.js"


const PropertyList = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState()
  const [destination, setDestination] = useState("");
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

  useEffect(() => {

    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/hotels/countByType`)
        setData(res.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, [])

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"

  ]
  const navigate = useNavigate();

  const handleSearch = (type) => {
    if(type){
      navigate("/hotels", { state: { destination, date, options, type } });
    }
  }

  return (
    <div className="pList">

      {loading
      ? <Loader /> 
      : error.length > 0 
        ? ( <Error msg={error}></Error>) 
        :
        <>
            {data.length && 
            images.map((img, ind) => (
              <div className="pListItem" key={ind} onClick={()=>handleSearch(data[ind].type)}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{ data[ind].type}</h1>
                  <h2>{data[ind].count} { data[ind].type}</h2>
                </div>
              </div>
            ))}
        </>
      }
    </div>
  );
};

export default PropertyList;