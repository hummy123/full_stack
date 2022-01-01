const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'FILTER':
            return action.mask
        default:
            return state
    }
}

export const filter = (mask) => ({ type: 'FILTER', mask: mask })

export default reducer
