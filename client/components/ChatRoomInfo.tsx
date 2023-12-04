import "../styles/ChatRoomInfo.css"

import { useSocket } from "@/context/socket.context"

const ChatRoomInfo = () => {
    const { roomID, usersConnected } = useSocket();

    return (
        <div className="chat-room-info">
            <p className="chat-room-header"> Room </p>
            <h3 className="room-id">{roomID}</h3>
            <div className="user-count">
                <div className="blinking-dot" />
                {usersConnected.length > 1 ? 
                <h4 >{usersConnected.length} Users Connected</h4> 
                : 
                <h4 >{usersConnected.length} User Connected</h4>
                }
            </div>
            <div className="user-list">
                {usersConnected?.map((user) => (<p className="user-connected">• {user}</p>))}
            </div>
        </div>
    );
}

export default ChatRoomInfo