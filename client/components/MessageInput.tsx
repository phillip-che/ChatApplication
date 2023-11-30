import "../styles/MessageInput.css"
import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import { useSocket } from "@/context/socket.context"
import EVENTS from '@/config/events';

const MessageInput = () => {

    const { socket, username, messages, setMessages, roomID } = useSocket();
    const [ textInput, setTextInput ] = useState("");
  
    const handleChange = (e: any) => {
        setTextInput(e.target.value);
    };
    
    const handleKeyPress = (e: any) => {
    if (e.key === "Enter") { 
        handleSendClick();
    }
    };

    const handleSendClick = () => {
        if (textInput.length < 1) {
            return;
        }
        const date = new Date();
        const timestamp = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
        setMessages([...messages, {username: username, text: textInput, timestamp: timestamp}]);
        socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {roomID: roomID, username: username, text: textInput, timestamp: timestamp});
        setTextInput("");
    };

    return (
        <div className="message-input">
            <TextField
                sx={{ 
                input: { color: "#F7F7F8" }, 
                fieldset: { borderColor: "#797272" },
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
                value={textInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Enter your message here.."
                fullWidth
            />
            <Button 
                sx={{color: "#F7F7F8"}}
                onClick={handleSendClick}
            > 
                Send 
            </Button>
        </div>
    )
}

export default MessageInput