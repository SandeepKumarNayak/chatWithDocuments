 import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      if(selectedFiles.length === 0) {
        alert("Please select a file first");
      } else {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Files uploaded successfully!');
      } else {
        setMessage('Failed to upload files.');
      }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during file upload.');
    }
    
  };

  return (
    <div style={{display:'flex', justifyContent:'center',flexDirection:'column',marginTop:'50px'}}>
      <input style={{padding:'20px',border:'1px solid black',borderStyle:'dashed',borderRadius:'5px',cursor:'pointer'}} type="file" multiple onChange={handleFileChange} />
      <Button sx={{marginTop:'20px'}} startIcon={<CloudUpload />} variant='contained' onClick={handleUpload}>Upload Files</Button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;

