import { Box } from "@mui/material";
import "../App.css";
import React from "react";
import { Person } from "@mui/icons-material";

function Home({ quesAns }) {
  return (
    <div className="homeContainer" style={{ width: "100%" }}>
      {quesAns.map((val, indx) => {
        return (
          <div
            key={indx}
            style={{
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              marginBottom: "15px",
              margin: "auto",
            }}
          >
            {
              val.type==='input'?( <div style={{display:'flex',justifyContent:'right',width:'100%',padding:'5px 20px'}}>
              {val.content}
            </div>):(<><Box
              sx={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                transform: "translateY(-5px)",
                marginRight: "4px",
              }}
            >
              <Person />
            </Box>
            <Box
              sx={{ marginLeft: "5px", marginBottom: "10px" }}
              className="inputOutputContainer"
            >
              <h4>AI</h4>
              <div
                className="ai-output"
                style={{ color: "black", padding: "5px", marginTop: "5px" }}
              >
                {`${val.content} \n\nSource: ${val.source}`}
              </div>
            </Box></>)
            }
           

            
            
          </div>
        );
      })}
    </div>
  );
}

export default Home;
