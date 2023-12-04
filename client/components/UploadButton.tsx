import "../styles/Image.css"
import "react-toastify/dist/ReactToastify.css";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EVENTS from '@/config/events';
import { toast, ToastContainer } from 'react-toastify';
import { useRef } from 'react';
import { useSocket } from "@/context/socket.context"

const UploadButton = () => {
    const { socket, username, messages, setMessages, roomID } = useSocket();

    const fileRef = useRef(null);

    const handleFile = (e: any) => {
        if(!e.target.files[0].type.includes("image/")) {
            toast.error('Only image files can be sent', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
        <ToastContainer />
        </div>
    )
};

export default UploadButton;