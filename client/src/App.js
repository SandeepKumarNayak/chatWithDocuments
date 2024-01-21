import React, {   useEffect, useState } from "react";
import Navbar from "./components/Navbar";
 
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./components/SearchBar";
 
import Home from "./components/Home";
import { getFiles } from "./api";

function App() {
  const [quesAns, setQuesAns] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    getFiles(handleGetFiles);
  },[])

  const handleGetFiles = (files) => {
    setFiles(files);
  }
  const handleDataFromSearchBar = (data)=>{
    setQuesAns(data);
  }
  
  return (
    <div>
      <Navbar files={files} handleGetFiles={handleGetFiles} />
      <Home quesAns={quesAns} />
      <SearchBar  handleDataFromSearchBar={handleDataFromSearchBar} setQuesAns={setQuesAns} files={files}/>
      <ToastContainer />
    </div>
  );
}

export default App;
