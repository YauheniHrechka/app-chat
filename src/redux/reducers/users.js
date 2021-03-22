const initialState = {
    rooms: [],
    user: {
        online: false
    },
    userRooms: new Map()
}

const setUserOnline = ({ userRooms }, { _id, socket_id, user }) => {
    userRooms.get(_id).users.get(user._id).online = true;
    userRooms.get(_id).users.get(user._id).socket_id = socket_id;
    return userRooms;
}

const setUserOffline = ({ userRooms }, { _id, user }) => {
    userRooms.get(_id).users.get(user._id).online = false;
    userRooms.get(_id).users.get(user._id).socket_id = '';
    return userRooms
}

const setUserRooms = (state, payload) => {
    const userRooms = new Map();
    payload.forEach(room => {
        if (!userRooms.has(room._id)) {
            let users = new Map();
            room.users.forEach(user => {
                if (!users.has(user._id)) {
                    if (state.user._id === user._id) {
                        user.online = true;
                    }
                    users.set(user._id, user);
                }
            })
            room['users'] = users;
            userRooms.set(room._id, room);
        }
    })
    return userRooms;
}

const setMessages = (userRooms, messages) => {
    userRooms.forEach(room => room['messages'] = messages.filter(message => message.room_id === room._id));
    return userRooms;
}

const addNewMessage = (userRooms, message) => {
    userRooms.get(message.room_id).messages.push(message);
    return userRooms;
}

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case "IS_JOINED":
            return {
                ...state,
                user: payload
            }

        case 'SET_ROOMS':
            return {
                ...state,
                rooms: payload
            };

        case 'SET_ROOMS_BY_USER':
            return {
                ...state,
                userRooms: setUserRooms(state, payload)
            };

        case 'SET_USER_ONLINE_IN_ROOMS':
            return {
                ...state,
                user: {
                    ...state.user,
                    socket_id: payload ? payload.socket_id : ''
                },
                userRooms: setUserOnline(state, payload)
            };

        case 'SET_USER_OFFLINE_IN_ROOMS':
            return {
                ...state,
                userRooms: setUserOffline(state, payload)
            };

        case 'SET_MESSAGES':
            return {
                ...state,
                userRooms: setMessages(state.userRooms, payload)
            };

        case 'ADDED_NEW_MESSAGE':
            return {
                ...state,
                userRooms: addNewMessage(state.userRooms, payload)
            };

        default:
            return state;
    }
}

export default users;