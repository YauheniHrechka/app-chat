const initialState = {
    rooms: [],
    user: {
        online: false
    },
    userRooms: new Map()
}

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case "IS_JOINED":
            return {
                ...state,
                user: payload
            }

        default:
            return state;
    }
}

export default users;