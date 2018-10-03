import { combineReducers } from "redux"

import { authenticationReducer as auth } from './authReducer' 
import { feedsReducer as feeds } from './feedsReducer' 

export const rootReducer = combineReducers({
    auth,
    feeds
})
