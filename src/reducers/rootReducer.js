/**
 * Created by deegha on 6/10/2018
 */

import { combineReducers } from "redux"

import { authenticationReducer as auth } from './authReducer' 
import { feedsReducer as feeds } from './feedsReducer'
import { waitingActionReducer as waitingAction } from './watingActionReducer'
import { allFeedsReducer as  allFeeds } from './allFeedsReducer' 
import { userFeedsReducer as userFeeds } from './userFeedsReducer' 

export const rootReducer = combineReducers({
    auth,
    feeds,
    waitingAction,
    allFeeds,
    userFeeds
})
