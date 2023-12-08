import "../styles/MessageInput.css"
import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import { useSocket } from "@/context/socket.context"
import UploadButton from "./UploadButton";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EVENTS from '@/config/events';
import crypto from 'crypto'

const MessageInput = () => {

    const { socket, username, messages, setMessages, roomID, aesKey } = useSocket();
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
        const timestamp = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;

        const iv = crypto.randomBytes(16);
        const ivString = iv.toString('hex');
        const aesString = aesKey.toString('hex');
        const encryptedMessage = encrypt(textInput, iv);
        setMessages([...messages, {type: "text", username: username, body: textInput, timestamp: timestamp}]);
        socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {type: "text", roomID: roomID, username: username, body: encryptedMessage, timestamp: timestamp, aesKey: aesString, iv: ivString});    

        setTextInput("");
    };

    const encrypt = (text: string, iv: any) => {
        console.log(aesKey.toString('hex'));
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encryptedMessage = cipher.update(text, 'utf-8', 'hex');
        encryptedMessage += cipher.final('hex');

        return encryptedMessage;
    };

    return (
        <div className="message-input">
            <UploadButton />
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
                inputProps={{ maxLength: 2048 }}
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