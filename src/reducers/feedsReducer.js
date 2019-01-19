/**
 * Created by deegha
 */

import * as Actions from '../actions/feedsActions'

const initialState = {
  feeds : [],
  loading: false,
  creating: false
}

export const feedsReducer = (state=initialState, action) => {
  switch(action.type) {
    case Actions.FETCH_FEEDS_REQUEST : 
      return {
        ...state,
        loading: true
      }
    case Actions.FETCH_FEEDS_REQUEST_FAIL: 
      return {
        ...state,
        loading: false
      } 
    case Actions.FETCH_FEEDS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        feeds: [...action.feeds, ...state.feeds]
      }
    case Actions.VOTE_UP:

      const feeds = state.feeds

      const newFeeds = feeds.map(feed => {
        
        if(feed.id === action.feedId) {
          
          const x  = {
            ...feed,
            voteUp: feed.voteUp+1,
            currentUserLiked: true
          }
          return x
        }else {
          return feed
        }
      })
      return {
        ...state,
        newFeeds
      }
    default : 
      return state
  }
}