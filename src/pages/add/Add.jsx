import React from "react";
import "./Add.scss";
import { useReducer } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import { useState } from "react";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Add = () => {
  const [coverImage, setCoverImage] = useState(undefined);
  const [Images, setImages] = useState([]);
  const [File, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = e =>{

    dispatch({
      type:"CHANGE_INPUT",
       payload:{name:e.target.name, value:e.target.value},
      });
  };

  const handleFeature= e =>{
    e.preventDefault();
    dispatch({
      type:"ADD_FEATURE",
       payload: e.target[0].value,
      });
      e.target[0].value ="";
  };

  const handleUpload= async () =>{
   setUploading(true);
    try{
      const cover = await upload(coverImage);

      const file = await upload(File);

      const images = await Promise.all(
        [...Images].map(async (image) =>{
          const url = await upload(image);
          return url;
          })

          
      );
      setUploading(false);
      dispatch({type:"ADD_IMAGES", payload:{cover, images, file}})

      //[...Images] Isto é para passar de fileList para Um array de files
    }catch(err){
      console.log(err);
    }


  };


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) => {
      console.log(gig);
      return newRequest.post("/ads/", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myAds"]);
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
      mutation.mutate(state);
      navigate("/myGigs")
  }


  console.log(state);

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name = "title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
            <div className="imagesInputs">
            <label htmlFor="">Cover Image</label>
            <input type="file" onChange={e=>setCoverImage(e.target.files[0])}/>
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple onChange={e=>setImages(e.target.files)}/>
            <label htmlFor="">Itenerary (.pdf)</label>
            <input type="file" onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <button onClick={handleUpload}>{uploading ? "" :"Upload"}</button>
            </div>


            <label htmlFor="">Description</label>
            <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16"  onChange={handleChange}>

            </textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" name="shortTitle" placeholder="e.g. One-page web design" onChange={handleChange}/>
            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" id="" onChange={handleChange} placeholder="Short description of your service" cols="30" rows="10"></textarea>
            
            <label htmlFor="">Add Features</label>
            <form action ="" className= "add" onSubmit={handleFeature}>
            <input type="text" placeholder="e.g. page design" />
            <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {
                state?.features?.map(f=>(

               
                
                
                <div className="item" key = {f}>
                <button onClick={()=>dispatch({type:"REMOVE_FEATURE", payload: f})}>
                  {f}
                  <span>X</span>
                </button>
              </div> ))}
            </div>
            
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
