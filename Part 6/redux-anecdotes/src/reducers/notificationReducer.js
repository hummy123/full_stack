const initial = {
    message: '',
    open: false,
    timeoutID: 0
}

let timeoutID

const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return {message: action.message, open: true}
        case 'CLOSE':
            return {message: '', open: false}
        default:
            return state
    }
}

const close = () => ({type: 'CLOSE'})

export const notify = (message, timeout=1) => {
    return (dispatch) => {
        clearTimeout(timeoutID)
        dispatch({type: 'NOTIFY', message: message})
        timeoutID = setTimeout(() => dispatch(close()), timeout * 1000)
    }
} 

export default reducer