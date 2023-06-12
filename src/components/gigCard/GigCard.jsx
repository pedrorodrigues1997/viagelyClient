import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";



const GigCard = ({ item }) => {
  const { isLoading, error, data} = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`
        )
        .then((res) => {
          return res.data;
        }),
  });
  
  
  //NOMES DAS COISAS NA DB

  return (
    <Link to={`/ads/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
        <span>{item.shortTitle}</span> 
          {
            isLoading ? (
              "Loading" 
            ) : error ? (
              "Something went wrong!"
            ) : (
            <div className="user">
            <img src={data.image || "/img/noavatar.jpg"} alt="" />
            <span>{data.username}</span>
            </div>
            )
          }
          
          <p>{item.shortDescription}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
