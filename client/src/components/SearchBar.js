import React, { useState, useEffect } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Mic, Send } from "@mui/icons-material";
import '../App.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { qna } from "../api";

function SearchBar({ handleDataFromSearchBar, setQuesAns }) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = () => {
    const data = {
      type:'input'
    }
    data.content = searchValue;
    handleDataFromSearchBar((prevValue) => [...prevValue, data]);
    qna(handleDataFromSearchBar, searchValue);
    setSearchValue("");
  };

  const startListening = () =>
    SpeechRecognition.startListening({ language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  useEffect(() => {
    setSearchValue(transcript);
  }, [transcript]);
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  // transform:'translateX(15px)'
  return (
    <Box sx={{width:'100%', maxWidth:'800px', margin:'auto' ,display:'flex',alignItems:'center',marginTop:'10px',padding:'0px 20px'}}>
      <TextField
        className="searchBarInput"
        placeholder="Ask anything..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchValue();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start" onClick={handleSearchValue}>
              <Send sx={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
        focused
      />

      <IconButton sx={{ width: "40px", height: "40px", borderRadius: "50%" }}>
        <Mic fontSize="medium" onClick={startListening} />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
