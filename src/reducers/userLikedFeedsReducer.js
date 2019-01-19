
/**
 * Created by deegha
 */

import { 
  FETCH_USER_LIKED_FEEDS_REQUEST,
  FETCH_USER_LIKED_FEEDS_SUCCESS,
  FETCH_USER_LIKED_FEEDS_FAIL } from '../actions/feedsActions'

const initialState = {
  loading: false,
  likedFeeds: []
}

export const userLikedFeedsReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_USER_LIKED_FEEDS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_LIKED_FEEDS_SUCCESS:
      return {
        ...state,
        loading: false,
        likedFeeds: action.feeds
      }
    case FETCH_USER_LIKED_FEEDS_FAIL:
      return {
        ...state,
        loading: false
      }
    default: 
      return state
  }
}