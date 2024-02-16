import { Avatar, Box } from "@mui/material";
import "../App.css";
import React from "react";
import Loader from "react-js-loader";
import { useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TypeAnimation } from "react-type-animation";
 
import ReactMarkdown from "react-markdown";

function Home({ quesAns }) {
  const chatbox = useRef(null);
  useEffect(() => chatbox?.current?.scrollIntoView(false), [quesAns]);

  return (
    <>
      {quesAns.length ? (
        <div className="homeContainer" style={{ width: "100%" }}>
          {quesAns.map((val, indx) => {
            return (
              <div
                ref={chatbox}
                key={indx}
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  display: "flex",
                  marginBottom: "15px",
                  margin: "auto",
                  padding: "10px 20px",
                  background: "white",
                }}
              >
                {val.type === "input" ? (
                  <div
                    style={{
                      color: "rgba(0,0,0,0.8)",
                      display: "flex",
                      justifyContent: "right",
                      width: "80%",
                      marginLeft: "auto",
                      marginRight: 0,
                      padding: "10px",
                    }}
                  >
                    <p style={{ fontFamily: "kanit" }}>{val.content}</p>
                  </div>
                ) : (
                  <>
                    <Box>
                      <Avatar
                        sx={{ boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}
                        src="https://static.vecteezy.com/system/resources/previews/004/996/790/non_2x/robot-chatbot-icon-sign-free-vector.jpg"
                      />
                    </Box>

                    <Box
                      sx={{ marginLeft: "5px", marginBottom: "10px" }}
                      className="inputOutputContainer"
                    >
                      <h4 style={{ marginTop: "5px", marginLeft: "10px" }}>
                        AI
                      </h4>
                      <div
                        className="ai-output"
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          color: "rgba(0,0,0,0.8)",
                          width: "90%",
                        }}
                      >
                        {val.loader === "true" ? (
                          <div
                            style={{
                              display: "flex",
                              marginLeft: "-60px",
                              marginTop: "-20px",
                            }}
                          >
                            <Loader
                              type="bubble-scale"
                              bgColor="rgba(0,0,0,0.8)"
                              size={20}
                            />
                          </div>
                        ) : (
                          <>
                            {" "}
                            {/* <p style={{whiteSpace:'pre-line', fontFamily: "kanit", fontWeight: 400 }}>
                              {val.content}
                            </p> */}
                            <ReactMarkdown>{val.content}</ReactMarkdown>
                            <p>
                              References:{" "}
                              {
                                val?.source?.map((f) => {
                                  return (
                                    <>
                                    <br/>
                                    {/* <a style={{textDecoration:'none',marginLeft:'20px',marginTop:'20px'}}  href={f}> {f.substring(f.lastIndexOf("\\")+1)} </a> */}
                                    <a style={{textDecoration:'none',marginLeft:'20px',marginTop:'20px'}}  href={f}> {f} </a>
                                    </>
                                  )
                                })
                              }
                               
                            </p>
                          </>
                        )}
                      </div>
                    </Box>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <Box className="homeContainer" style={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              flexDirection: "column",
              color: "rgba(0,0,0,0.8)",
              margin: "100px auto",
            }}
          >
            <img
              style={{ width: "200px" }}
              src="https://static.vecteezy.com/system/resources/previews/004/996/790/non_2x/robot-chatbot-icon-sign-free-vector.jpg"
              alt="robot"
            />
            <h3>Chat with your documents</h3>
          </Box>
          <ToastContainer />
        </Box>
      )}
    </>
  );
}

export default Home;
