import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
 
//currentUser.id ou currentUser._id ??????
function MyGigs() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {isLoading, error, data } = useQuery({
    queryKey:["myAds"],
    queryFn: () => 
        newRequest.get(`/ads?userId=${currentUser._id}`).then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/ads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myAds"]);
    },
  });


  const handleDelete = (id) => {
    mutation.mutate(id);
  }


  const handleRedirect = (gigId) => {
    navigate(`/ads/${gigId}`);
  }


  const handleClick = () =>{
    if (input !== "") {
      navigate(`/ads?search=${input}`);
    } else {
      // Perform another action when input is empty
      navigate(`/ads`);
    
    }
  
  
  }

  return (
    <div className="myGigs">
      {
        isLoading ? "Loading" :
        error ? "Something wrong happened!" :        
        
        <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
            <button onClick={handleClick}>Checkout</button>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {data.map(gig => (
            
            <tr key={gig.id}>
            <td>
              <img
                className="image"
                src={gig.cover}
                alt=""
                onClick={()=>handleRedirect(gig._id)}
              />
            </td>
            <td onClick={()=>handleRedirect(gig._id)}>{gig.title}</td>
            <td onClick={()=>handleRedirect(gig._id)}>{gig.price}</td>
            <td>{gig.sales}</td>
            <td>
              <img className="delete" src="./img/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
            </td>
          </tr>))}
        </table>
      </div>}
    </div>
  );
}

export default MyGigs;
