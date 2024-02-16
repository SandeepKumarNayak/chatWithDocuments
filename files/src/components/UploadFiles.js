import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Loader from "react-js-loader";
// import axios from 'axios'
import { Edit } from "@mui/icons-material";
import { getFiles } from "../api";
 
 
 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UploadFiles({id, file_name,handleUploadedFiles, notify}) {
  const [open, setOpen] = React.useState(false);
  const [myFile, setMyFile] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelFiles = () => {
    setMyFile(null);
    handleClose();
  };

  const handleFileChange = (e) => {
    setMyFile(e.target.files[0]);
  };


  const handleUpdateFile = async () => {
    try{
      const formData = new FormData();
      formData.append('file', myFile);
      setLoader(true);
      const response = await fetch(`http://127.0.0.1:8000/upload/?id=${id}`,{
        method:'PATCH',
        body:formData
      });

      setLoader(false);
      handleCancelFiles();
      if(response.ok) {
        getFiles(handleUploadedFiles);
        notify("Files updated successfully")
      } else {
        notify("Something went wrong!")
      }
    } catch(err) {
      notify("Error in updating files");
    }
  };





  // const handleUpdateFile = async () => {
  //   const formData = new FormData();
  //   formData.append("file", myFile);
  //   setLoader(true);

  //   // setTimeout(() => {
  //   //   setLoader(false);
  //   //   notify("File updated Successfully")

  //   //   handleCancelFiles();
  //   // }, 1500);

    
  //   axios
  //     .patch(`http://127.0.0.1:8000/upload/?id=${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       // Handle successful response
  //       console.log(response.data);
  //       setLoader(false);
  //       handleCancelFiles();
  //       notify("file updated successfully");
  //       getFiles(handleUploadedFiles)
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //       getFiles(handleUploadedFiles)
  //       setLoader(false);
  //       handleCancelFiles();
  //       notify("Error in file uploading");
  //     });
  // };

  return (
    <React.Fragment>
     

      <Edit sx={{cursor:'pointer'}} fontSize="small" onClick={handleClickOpen} />
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
            <DialogTitle sx={{marginLeft:'40px'}}>{`You are updating ${file_name}`}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  width: "500px",
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  style={{
                    padding: "30px 80px",
                    border: "1px solid black",
                    borderStyle: "dashed",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  type="file"
                  onChange={handleFileChange}
                />
              </DialogContentText>
            </DialogContent>

            <DialogActions sx={{marginRight:'55px',marginBottom:'10px'}}>
              <Button onClick={handleCancelFiles} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleUpdateFile} variant="contained">
                Update
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
