import axios from "axios"
const url = "http://127.0.0.1:8000"

export const qna = async(handleDataFromSearchBar,searchValue) => {
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

 
}
 
}

export const getFiles = async () => {
  const { data } = await axios.get(`${url}/upload/`);
  console.log(data);
  return data;
};
