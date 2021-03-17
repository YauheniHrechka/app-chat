export const setIsJoined = (user) => ({
    type: "IS_JOINED",
    payload: user
})

export const setRooms = (rooms) => ({
    type: 'SET_ROOMS',
    payload: rooms
})

export const setRoomsByUser = (rooms) => ({
    type: 'SET_ROOMS_BY_USER',
    payload: rooms
})