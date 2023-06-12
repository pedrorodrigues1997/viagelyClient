import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const { isLoading, error, data} = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`
        )
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <div className="orders">
      {
        isLoading ? "loading" : error ? "error" :
        
        
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
                />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
            </tr>



            ))
           }
        </table>
      </div>}
    </div>
  );
};

export default Orders;
