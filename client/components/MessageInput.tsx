import "../styles/MessageInput.css"
import { Button, TextField } from '@mui/material';
import { useState, useRef } from 'react'
import { useSocket } from "@/context/socket.context"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EVENTS from '@/config/events';

const MessageInput = () => {

    const { socket, username, messages, setMessages, roomID } = useSocket();
    const [ textInput, setTextInput ] = useState("");
    const fileRef = useRef(null);

    const handleChange = (e: any) => {
        setTextInput(e.target.value);
    };
    
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") { 
            handleSendClick();
        }
    };

    const handleFile = (e: any) => {
        fileRef.current = e.target.files[0];
        const timestamp = getTime();
        if(fileRef.current) {
            setMessages([...messages, {type: "file", username: username, body: fileRef.current, timestamp: timestamp}]);
            socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {type: "file", roomID: roomID, username: username, body: fileRef.current, timestamp: timestamp});    
            fileRef.current = null;
        }
    };

    const handleSendClick = () => {
        if (textInput.length < 1) {
            return;
        }

        const timestamp = getTime();
        setMessages([...messages, {type: "text", username: username, body: textInput, timestamp: timestamp}]);
        socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {type: "text", roomID: roomID, username: username, body: textInput, timestamp: timestamp});    

        setTextInput("");
    };

    const getTime = () => {
        const date = new Date();
        return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    return (
        <div className="message-input">
            <div className="file-upload">
                <label 
                    onChange={handleFile} 
                    onClick={(e : any) => e.target.value = null}
                    htmlFor="formId"
                >
                    <input name="" type="file" id="formId" hidden />
                    <FileUploadOutlinedIcon />
                </label>
            </div>
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
                    borderColor: "#76736F"}
                },
                }}
                value={textInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Message"
                fullWidth
            />
            <Button
                className="send-message-button"
                sx={{
                    color: "#F7F7F8",
                    ':hover': {
                        bgcolor: 'transparent', 
                        opacity: '0.5',
                    }
                }}
                onClick={handleSendClick}
            >
                <SendOutlinedIcon /> 
            </Button>
        </div>
    )
}

export default MessageInput