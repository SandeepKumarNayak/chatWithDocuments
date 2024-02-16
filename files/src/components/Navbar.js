import { Box, Typography } from '@mui/material'
import React from 'react'
import '../App.css'

function Navbar() {
  return (
     <Box className="navbar">
        <Box className="left">
            <Typography sx={{cursor:'pointer'}} variant='h5'>Logo</Typography>
        </Box>
     </Box>
  )
}

export default Navbar
