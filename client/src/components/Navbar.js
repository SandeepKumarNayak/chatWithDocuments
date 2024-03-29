import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { Typography } from "@mui/material";
import { FilePresent, Menu } from "@mui/icons-material";
import FileUpload from "./FileUpload";
import EditFiles from "./EditFiles";
import UpdateFile from "./UpdateFile";

export default function Navbar({ files, handleGetFiles }) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box
      sx={{
        height: "60px",
        boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        marginBottom: "10px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ cursor: "pointer", fontSize: "25px", color: "rgba(0,0,0,0.7)" }}
      >
        Chat
      </Typography>
      <Menu
        onClick={toggleDrawer("left", true)}
        sx={{ color: "rgba(0,0,0,0.7)", cursor: "pointer" }}
        fontSize="large"
      />
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: "300px", padding: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Chat</h2>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
          >
            <Typography variant="h5" sx={{ mb: "10px" }}>
              Uploaded Files
            </Typography>

            {files.length ? (
              files.map((file, indx) => {
                return (
                  <Box key={indx} sx={{ display: "flex",justifyContent:'space-between',marginBottom:'20px' }}>
                    <Box sx={{display:'flex'}}>
                    <FilePresent />
                    <Typography
                      sx={{ marginLeft: "10px", fontSize: "16px" }}
                      variant="h5"
                    >
                      {file.file_name}
                    </Typography>
                      </Box>
                    <UpdateFile handleGetFiles={handleGetFiles} id={file.id} file_name={file.file_name} />
                  </Box>
                );
              })
            ) : (
              <p>You do not have any file</p>
            )}
          </Box>
          {/* {files.length > 0 && (
            <div>
              {" "}
              <EditFiles files={files} handleGetFiles={handleGetFiles} />
              <UpdateFile files={files} handleGetFiles={handleGetFiles} />
            </div>
          )} */}
          <FileUpload handleGetFiles={handleGetFiles} />
        </Box>
      </Drawer>
    </Box>
  );
}
