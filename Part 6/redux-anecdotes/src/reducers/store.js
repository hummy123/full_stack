import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
