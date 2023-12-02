const EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CLIENT: {
        SEND_MESSAGE: 'c_send_message',
        JOIN_ROOM: 'c_join_room',
        LEAVE_ROOM: 'c_leave_room',
        CREATE_ROOM: 'c_create_room'
    },
    SERVER: {
        SEND_MESSAGE: 's_send_message',
        JOIN_ROOM: 's_join_room',
        LEAVE_ROOM: 's_leave_room',
        CREATE_ROOM: 's_create_room'
    }
};

export default EVENTS;