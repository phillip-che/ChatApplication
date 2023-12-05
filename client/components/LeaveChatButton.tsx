import "../styles/LeaveChatButton.css"
import Button from '@mui/material/Button';
import EVENTS from '@/config/events';
import { useSocket } from "@/context/socket.context"

const LeaveChatButton = () => {
    const { socket, roomID } = useSocket();

    const handleLeaveChatClick = () => {
        socket.emit(EVENTS.CLIENT.LEAVE_ROOM, {roomID});
    }
    
    return (
        <div className="leave-room-button bob-on-hover">
            <Button color='inherit' onClick={handleLeaveChatClick}>
                Leave Room
            </Button>
        </div>
    )
}

export default LeaveChatButton