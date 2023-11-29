"use client";

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EVENTS from '@/config/events';
import { useSocket } from "@/context/socket.context"


const NavBar = () => {
  const { socket, username, setUsername, roomID } = useSocket();

  const handleLeaveChatClick = () => {
    socket.emit(EVENTS.CLIENT.LEAVE_ROOM, {roomID});
  }

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CypherChat
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {roomID ? <div>RoomID: {roomID} </div> : null}
          </Typography>
          {roomID ?
            <Button color='inherit' onClick={handleLeaveChatClick}>
              Leave Chat
            </Button>
          : null}
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default NavBar;