const initial = {
    message: '',
    open: false
}

const reducer = (state = initial, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'NOTIFY':
            return {message: action.message, open: true}
        case 'CLOSE':
            return {message: '', open: false}
        default:
            return state
    }
}

export const notify = (message) => ({type: 'NOTIFY', message: message})
export const close = () => ({type: 'CLOSE'})

export default reducer