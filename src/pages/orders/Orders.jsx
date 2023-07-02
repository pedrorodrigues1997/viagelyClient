import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();


  const { isLoading, error, data} = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`
        )
        .then((res) => {
          return res.data;
        }),
  });


  const handleRedirect = (gigId) => {
    navigate(`/ads/${gigId}`);
  }


  return (
    <div className="orders">
      {
        isLoading ? <LoadingCircle /> : error ? "error" :
        
        
        <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
          {
            
            data.map(order =>(
              <tr key ={order._id}>
              <td>
                <img
                  className="image"
                  src={order.image}
                  alt=""
                  onClick={()=>handleRedirect(order.adId)}
                />
              </td>
              <td onClick={()=>handleRedirect(order.adId)}>{order.title}</td>
              <td onClick={()=>handleRedirect(order.adId)}>{order.price}</td>
            </tr>



            ))
           }
        </table>
      </div>}
    </div>
  );
};

export default Orders;
