import axios from "axios"
const url = "http://127.0.0.1:8000"

export const qna = async(handleDataFromSearchBar,searchValue) => {
    const reqQues = {
         
    }
    reqQues.ques = searchValue;
     
    const {data} =  await axios.post(`${url}/qna/`, reqQues);
    const myData = {
        'type':'output'
    }
    myData.content = data.result;
    myData.source = data.source;
    console.log(data)
    
    handleDataFromSearchBar((prevValue) => [...prevValue, myData]);
    // console.log(data)
}