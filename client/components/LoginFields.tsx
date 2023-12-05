'use client';

import "../styles/LoginFields.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EVENTS from '@/config/events';
import { useEffect, useState } from 'react';
import { useSocket } from '@/context/socket.context';

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
    sessionStorage.setItem("username", usernameInput);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, {roomID: roomIDInput, username: usernameInput, socketID: socket.id});
  };

  const handleCreateRoomClick = () => {
    setUsername(usernameInput);
    sessionStorage.setItem("username", usernameInput);
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, {username: usernameInput});
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") || "");
    setUsernameInput(sessionStorage.getItem("username") || "");
    setRoomIDInput(roomID || "");
  }, []);

  return (
    <div className="login-fields">
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
              "& .MuiInputLabel-root.Mui-focused": {color: '#76736F'}, 
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
            inputProps={{ maxLength: 16 }}
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
      <div className="room-input">
        <TextField
          sx={{ 
            input: { color: "#F7F7F8" }, 
            label: {color: "#797272"},
            "& .MuiInputLabel-root": {color: '#76736F'}, 
            "& .MuiInputLabel-root.Mui-focused": {color: '#76736F'}, 
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
          inputProps={{ maxLength: 10 }}
        />
      </div>  
      <div>
        <Button 
        sx={{
          "&.Mui-disabled": {
            opacity: ".5",
            color: "#c0c0c0"
          }
        }}
        style={{
          backgroundColor: "#797272",
          width: "225px"
        }}
        variant="contained"
        disabled={(!usernameInput || !roomIDInput)}
        onClick={handleJoinRoomClick}
        >
          Join Room
        </Button>

        <h3>OR</h3>

        <Button 
        sx={{
          "&.Mui-disabled": {
            opacity: ".5",
            color: "#c0c0c0"
          }
        }}
        style={{
          backgroundColor: "#797272",
          width: "225px"
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
