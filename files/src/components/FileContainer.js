import React from 'react'
import '../App.css'
import { Box, Typography } from '@mui/material'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
 
import UploadFiles from './UploadFiles';

function FileContainer({uploadedFiles,handleUploadedFiles, notify}) {
     
    
  return (
    <div className='fileContainer'>
        <Typography sx={{textAlign:'center',marginBottom:'10px',paddingBottom:'5px',borderBottom:'1px solid black '}} variant='h5'>Uploaded Files</Typography>
        {
            uploadedFiles?.length > 0 ?(
                <Box>
                     {
                        uploadedFiles.map((uploadedFile, indx) => {
                            return (
                                <Box key={indx} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px'}}>
                                    <Box sx={{display:'flex',alignItems:'center'}}>
                                        <FilePresentOutlinedIcon />
                                        <Typography sx={{marginLeft:'5px'}} variant='body2'>{uploadedFile.file_name}</Typography>
                                    </Box>
                                    <Box>
                                         <UploadFiles notify={notify} id={uploadedFile.id} file_name={uploadedFile.file_name} handleUploadedFiles={handleUploadedFiles} />
                                    </Box>
                                </Box>
                            )
                        })
                     }
                </Box>
            ):(
                <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <img style={{width:'50%',maxWidth:'200px',margin:'auto',marginTop:'20px'}} src='https://cdn-icons-png.flaticon.com/512/6598/6598519.png' alt='emptylist' />
                    <Typography sx={{textAlign:'center'}} variant='h6'>Don't have any files.</Typography>
                </Box>
            )
        }

    </div>
  )
}

export default FileContainer
