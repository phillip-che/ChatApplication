'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSocket } from '@/context/socket.context';
import EVENTS from '@/config/events';

const LoginFields = () => {
    
    const { socket, username, setUsername, roomID } = useSocket();
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [roomIDInput, setRoomIDInput] = useState<string>("");

  const handleUsernameChange = (e: any) => {
    setUsernameInput(e.target.value);
  };

  const handleRoomChange = (e: any) => {
    setRoomIDInput(e.target.value);
  };

  const handleJoinRoomClick = () => {
    setUsername(usernameInput);
    localStorage.setItem("username", usernameInput);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, {roomID: roomIDInput, username: username, socketID: socket.id});
  };

  const handleCreateRoomClick = () => {

  }

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setUsernameInput(localStorage.getItem("username") || "");
    setRoomIDInput(roomID || "");
  }, []);

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="username-container">
          <TextField
            sx={{ 
              input: { color: "#F7F7F8" },
              label: {color: "#797272"},
              "& .MuiInputLabel-root": {color: '#76736F'}, 
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#76736F" },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": { borderColor: "#797272"}
              },
              "& .MuiOutlinedInput-root:hover": {
                "& > fieldset": { borderColor: "#F7F7F8"}
              },
            }}
            onChange={handleUsernameChange}
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={usernameInput}
          />
        </div>
      </Box>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <div className="room-container">

        <TextField
          sx={{ 
            input: { color: "#F7F7F8" }, 
            label: {color: "#797272"},
            "& .MuiInputLabel-root": {color: '#76736F'}, 
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#76736F" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "#797272"}
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#F7F7F8"}
            },
          }}
          onChange={handleRoomChange}
          required
          id="outlined-basic"
          label="Room ID"
          variant="outlined"
          value={roomIDInput}
        />
        
        <Button 
        sx={{
          "&.Mui-disabled": {
            opacity: ".5",
            color: "#c0c0c0"
          }
        }}
        style={{
          backgroundColor: "#797272",
        }}
        variant="contained"
        disabled={(!usernameInput || !roomIDInput)}
        onClick={handleJoinRoomClick}
        >
          Join Room
        </Button>

        <p>OR</p>

        <Button 
        sx={{
          "&.Mui-disabled": {
            opacity: ".5",
            color: "#c0c0c0"
          }
        }}
        style={{
          backgroundColor: "#797272",
        }}
        variant="contained" 
        disabled={!usernameInput}
        onClick={handleCreateRoomClick}
        >
          Create Room
        </Button>

      </div>  
    </Box>
  </div>
  );
};

export default LoginFields;
