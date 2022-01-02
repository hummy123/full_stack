const initial = {
    message: '',
    open: false
}

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
        dispatch({type: 'NOTIFY', message: message})
        setTimeout(() => dispatch(close()), timeout * 1000)
    }
} 

export default reducer