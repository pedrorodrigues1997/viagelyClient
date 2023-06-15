import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
 
//currentUser.id ou currentUser._id ??????
function MyGigs() {
  const currentUser = getCurrentUser();

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
              />
            </td>
            <td>{gig.title}</td>
            <td>{gig.price}</td>
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
