import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

export const store = createStore(reducer, composeWithDevTools())
