
import "../styles/Image.css"
import { useRef } from 'react';
import { useSocket } from "@/context/socket.context"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EVENTS from '@/config/events';

const UploadButton = () => {
    const { socket, username, messages, setMessages, roomID } = useSocket();

    const fileRef = useRef(null);

    const handleFile = (e: any) => {
        if(!e.target.files[0].type.includes("image/")) {
            return;
        }
        fileRef.current = e.target.files[0];
        const date = new Date();
        const timestamp = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;
        if(fileRef.current) {
            setMessages([...messages, {type: "file", username: username, body: fileRef.current, timestamp: timestamp}]);
            socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {type: "file", roomID: roomID, username: username, body: fileRef.current, timestamp: timestamp});    
        }
    };

    return (
        <div className="file-upload">
        <label 
            onChange={handleFile} 
            htmlFor="formId"
        >
            <input name="" type="file" id="formId" hidden />
            <FileUploadOutlinedIcon />
        </label>
        </div>
    )
};

export default UploadButton;