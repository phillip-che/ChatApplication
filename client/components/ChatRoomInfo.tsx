import { Divider } from '@mui/material';
import '../styles/ChatRoomInfo.css';

import LeaveChatButton from './LeaveChatButton';
import { useSocket } from '@/context/socket.context';

const ChatRoomInfo = () => {
  const { roomID, usersConnected } = useSocket();

  return (
    <div className="chat-room-info">
      <p className="chat-room-header"> Room ID </p>
      <h3 className="room-id">{roomID}</h3>
      <Divider variant="fullWidth" sx={{ bgcolor: 'grey', m: 1 }} />
      <div className="user-count">
        <div className="blinking-dot" />
        {usersConnected.length > 1 ? (
          <h4>{usersConnected.length} Users Connected</h4>
        ) : (
          <h4>{usersConnected.length} User Connected</h4>
        )}
      </div>
      <div className="user-list">
        {usersConnected?.map((user) => (
          <p className="user-connected">• {user}</p>
        ))}
      </div>
      <LeaveChatButton />
    </div>
  );
};

export default ChatRoomInfo;
