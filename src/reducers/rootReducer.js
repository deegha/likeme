import { combineReducers } from "redux"

import { authenticationReducer as auth } from './authReducer' 

export const rootReducer = combineReducers({
    auth
})
