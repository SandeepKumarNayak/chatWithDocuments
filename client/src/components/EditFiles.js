import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Loader from "react-js-loader";
import { getFiles } from "../api";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function EditFiles({ files, handleGetFiles }) {
  const [open, setOpen] = React.useState(false);
  // const [message, setMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [deleteFiles, setDeleteFiles] = React.useState([]);

  const handleCheckBoxFiles = (id) => {
    setDeleteFiles((prevFiles) => {
      if (prevFiles.includes(id)) {
        return prevFiles.filter((myId) => myId !== id);
      } else {
        return [...prevFiles, id];
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelFiles = () => {
    setDeleteFiles([]);
    handleClose();
  };
  const handleDeleteFiles = async () => {
    try {
      setLoader(true);
      const response = await fetch("http://127.0.0.1:8000/upload/", {
      method: "DELETE",
      body: JSON.stringify({ ids: deleteFiles }),
      headers: {
        "Content-Type": "application/json",
      },
    });

      if (response.ok) {
        getFiles(handleGetFiles);
        handleCancelFiles();
        setLoader(false);
      } else {
        console.log(response);
        handleCancelFiles();
        setLoader(false);
      }
    } catch (error) {
      console.error("Error:", error);
      handleCancelFiles();
      setLoader(false);

    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{ mt: "20px" }}
        color="secondary"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Delete Files
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        {loader ? (
          <DialogContent
            style={{
              width: "500px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Loader
              type="spinner-circle"
              bgColor="rgba(0,0,0,0.8)"
              size={100}
            />
            <p>Please Wait ...</p>
          </DialogContent>
        ) : (
          <>
            <DialogTitle>{"Select Files for delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ width: "500px", maxWidth: "100%" }}
              >
                <ul style={{ listStyle: "none" }}>
                  {files &&
                    files.map((file) => {
                      return (
                        <li key={file.id}>
                          <input
                            type="checkbox"
                            checked={deleteFiles.includes(file.id)}
                            onChange={() => handleCheckBoxFiles(file.id)}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          />
                          {file.file_name}
                        </li>
                      );
                    })}
                </ul>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelFiles} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleDeleteFiles} variant="contained">
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
