import React, { useEffect } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {

const {id} = useParams();

  const { isLoading, error, data} = useQuery({
    queryKey: ["ad"],
    queryFn: () =>
      newRequest.get(`/ads/single/${id}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const userId = data?.userId;
  const currentUserLocal = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserLocalId = currentUserLocal?._id;
  const isLoggedIn = currentUserLocal !== null && currentUserLocal !== undefined;
  const {
    isLoading: isLoadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () =>
      newRequest.get(`/users/${currentUserLocalId}`).then((res) => {
        return res.data;
      }),
    enabled: !!currentUserLocalId,
  });





  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userId) {
      refetchUser();
    }
  }, [userId, refetchUser]);
  
  return (
    <div className="gig">
      {isLoading ? " loading" : error ? "Something went wrong" : <div className="container">
        <div className="left">
          <span className="breadcrumbs">Liverr  Graphics & Design </span>
          <h1>{data.title}</h1>
          {isLoadingUser ? (
            "Loading"
             ): errorUser ? (
              "Something went wrong!"
              ) :(
            
            <div className="user">
            <img
              className="pp"
              src={dataUser.image || "/img/noavatar.jpg"}
              alt=""
            />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) && 
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber))
              .fill()
              .map((item, i) =>(
                <img src="/img/star.png" alt="" key={i} />
              ))}
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>}
          </div>)}
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {data.images.map((img) => (
              <img
              key={img}
              src={img}
              alt=""
            />
              
            ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>
          {
            isLoadingUser ? (
              "Loading"
               ): errorUser ? (
                "Something went wrong!"
                ) :(
            
            <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser.image || "/img/noavatar.jpg"}
                alt=""
              />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && 
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber))
              .fill()
              .map((item, i) =>(
                <img src="/img/star.png" alt="" key={i} />
              ))}
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country || ""}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p className="desc">
                {dataUser.desc}
              </p>
            </div>
          </div>
          )}
          {isLoggedIn && ( isLoadingCurrentUser ? (
            "Loading"
             ): errorCurrentUser ? (
              "Something went wrong!"
              ) :(
                
          <Reviews gigId={id} userId={dataCurrentUser._id} sellerId={data.userId}/>
              ))}
        </div>
        {
  isLoggedIn && (
    isLoadingCurrentUser ? (
      "Loading"
    ) : errorCurrentUser ? (
      "Something went wrong!"
    ) : (
      currentUserLocal && dataCurrentUser && (     
        data.userId === dataCurrentUser._id ||
        dataCurrentUser.purchasedOrders.includes(data._id)
      ) ? (
        ""
      ) : (
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p className="details">{data.shortDesc}</p>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      )
    )
  )
}
      
      </div>}
    </div>
  );
}

export default Gig;
