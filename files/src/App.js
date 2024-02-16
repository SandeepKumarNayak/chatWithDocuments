import { Box,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import FileContainer from './components/FileContainer'
import AddFiles from './components/AddFiles'
import { getFiles } from './api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  useEffect(()=>{
    getFiles(handleUploadedFiles);
  },[])

const handleUploadedFiles = (files) => {
  setUploadedFiles(files);
}

const notify = (msg) => toast.success(msg);
  return (
    <Box className="app">
      <Navbar />
      <FileContainer notify={notify} uploadedFiles={uploadedFiles} handleUploadedFiles={handleUploadedFiles} />
      <AddFiles handleUploadedFiles={handleUploadedFiles} notify={notify}/>
      <ToastContainer />
    </Box>
  )
}

export default App
