import axios from "axios"
const url = "http://127.0.0.1:8000"

export const qna = async(handleDataFromSearchBar,searchValue) => {

  try{
    const reqQues = {
         
    }
    reqQues.ques = searchValue;
    const myData = {
        'type':'output'
    }
    myData.loader = "true";
    handleDataFromSearchBar((prevValue) => [...prevValue, myData]);
   
    const {data} =  await axios.post(`${url}/qna/`, reqQues);
    
    myData.source = data.source;
    myData.content = data.result;
   
    myData.loader = "false";
    handleDataFromSearchBar((prevValue) => [...prevValue])
  } catch(err) {
    const {code} = err;
    if(code === "ERR_NETWORK") {
      alert("Server is not running.");
    }  
  }
    

 
}

export const getFiles = async (handleGetFiles) => {

  try{
    const { data } = await axios.get(`${url}/upload/`);
    handleGetFiles(data);
    return data;
  } catch(err) {
    const {code} = err;
    if(code === "ERR_NETWORK") {
      alert("Server is not running.");
    }
  }
  
};
