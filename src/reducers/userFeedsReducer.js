/**
 * Created by deegha
 */

import { 
  FETCH_USER_FEEDS_REQUEST, 
  FETCH_USER_FEEDS_SUCCESS, 
  FETCH_USER_FEEDS_FAIL } from '../actions/feedsActions'

const initialState = {
  loading: false,
  userFeeds: []
}

export const userFeedsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_FEEDS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_FEEDS_FAIL: 
      return {
        ...state,
        loading: false
      }
    case FETCH_USER_FEEDS_SUCCESS:
      return {
        ...state,
        userFeeds: action.feeds
      }
    default:
      return state
  }
}