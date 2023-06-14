import React, { useState } from "react";
import "./Featured.scss";
import { Link, useNavigate } from "react-router-dom";

function Featured() {


const [input, setInput] = useState("");
const navigate = useNavigate();
const handleSubmit = () =>{
  navigate(`/ads?search=${input}`);


}

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>plan</span> for your vacation
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "building mobile app"'  onChange={(e) => setInput(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Japan</button>
            <button>USA</button>
            <button>Nightlife</button>
            <button>Beach</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/herobanner2.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
