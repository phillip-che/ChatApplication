'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/socket.context';
import EVENTS from '@/config/events';

const LoginFields = () => {
    
    const { socket, username, setUsername, roomID } = useSocket();
    const router = useRouter();
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
    router.push('/chats');
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
          onChange={handleRoomChange}
          required
          id="outlined-basic"
          label="Room ID"
          variant="outlined"
          value={roomIDInput}
        />
        
        <Button 
        variant="contained"
        disabled={(!usernameInput || !roomIDInput)}
        onClick={handleJoinRoomClick}
        >
          Join Room
        </Button>

        <p>OR</p>

        <Button 
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
