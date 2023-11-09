'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/socket.context';

const UsernameInput = () => {
    
    const { socket, username, setUsername } = useSocket();
    const router = useRouter();
    const [usernameInput, setUsernameInput] = useState<string>("");

  const handleChange = (e: any) => {
    setUsernameInput(e.target.value);
  };

    const handleClick = () => {
        if(usernameInput.length != 0) {
            setUsername(usernameInput);
            
            localStorage.setItem("username", usernameInput);
            router.push('/chats');
        }
    };

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "");
    }, []);

  const logoutHandler = () => {
    if (username != '') {
      localStorage.removeItem('username');
      setUsername('');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {username ? (
        <div>
          Username: {username} <br />
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      ) : (
        <div className="username-container">
          <TextField
            onChange={handleChange}
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleClick}>
            Enter
          </Button>
        </div>
      )}
    </Box>
  );
};

export default UsernameInput;
