"use client";

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import Logo from '../assets/images/logo.jpg'

const NavBar = () => {

  return (
    <Box color={"black"} sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#141415' }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
          </IconButton>
          <Image src={Logo} alt="" width={64} height={40} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CypherChat
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default NavBar;