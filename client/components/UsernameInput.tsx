"use client"

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import { useSocket } from '@/context/socket.context';

const UsernameInput = () => {
    
    // const { socket } = useSocket();
    const router = useRouter();
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [username, setUsername] = useState<string>("");

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
        if(!username) {
            setUsername(localStorage.getItem("username") || "");
        };
    }, []);

    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            {username ? 
            <div> Username: {username} </div> : 
            <div className="username-container">
                <TextField onChange={handleChange} required id="outlined-basic" label="Username" variant="outlined" />
                <Button variant="contained" onClick={handleClick}>Enter</Button>
            </div>
            }
        </Box>  
    );
}

export default UsernameInput