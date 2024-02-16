import axios from "axios"
const url = "http://127.0.0.1:8000"



export const getFiles = async (handleUpdatedFiles) => {

    try{
      const { data } = await axios.get(`${url}/upload/`);
      handleUpdatedFiles(data);
      return data;
    } catch(err) {
      const {code} = err;
      if(code === "ERR_NETWORK") {
        alert("Server is not running.");
      }
    }
    
  };