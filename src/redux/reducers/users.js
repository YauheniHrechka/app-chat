const initialState = {
    rooms: [],
    user: {
        online: false
    },
    userRooms: new Map()
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

        default:
            return state;
    }
}

export default users;