export const setMessages = (messages) => ({
    type: "SET_MESSAGES",
    payload: messages
})

export const setAddedNewMessage = (message) => ({
    type: "ADDED_NEW_MESSAGE",
    payload: message
})