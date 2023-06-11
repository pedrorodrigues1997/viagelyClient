import axios from "axios";


const upload = async (file) =>{
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "viagely");    //Isto deve ser o folder name

    try{
      const res = await axios.post("https://api.cloudinary.com/v1_1/djc6xhpob/image/upload", data);

      const {url} = res.data;
      return url;


    }catch(err){
      console.log(err);
    }

}

export default upload;