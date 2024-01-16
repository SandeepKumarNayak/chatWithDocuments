import React, {   useState } from "react";
import Navbar from "./components/Navbar";
 
 
import SearchBar from "./components/SearchBar";
 
import Home from "./components/Home";

function App() {
  const [quesAns, setQuesAns] = useState([]);
  const handleDataFromSearchBar = (data)=>{
    setQuesAns(data);
  }
  
  return (
    <div>
      <Navbar />
      <Home quesAns={quesAns} />
      <SearchBar  handleDataFromSearchBar={handleDataFromSearchBar} setQuesAns={setQuesAns} />
    </div>
  );
}

export default App;
