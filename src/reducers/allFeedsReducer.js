/**
 * Created by deegha
 */

import * as Actions from '../actions/feedsActions'

const initialState = {
  feeds : [],
  loading: false,
  creating: false
}

export const allFeedsReducer = (state=initialState, action) => {
  switch(action.type) {
    case Actions.FETCH_ALL_FEEDS_REQUEST : 
      return {
        ...state,
        loading: true
      }
    case Actions.FETCH_ALLFEEDS_REQUEST_FAIL: 
      return {
        ...state,
        loading: false
      } 
    case Actions.FETCH_ALLFEEDS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        feeds: action.feeds
      }
    case Actions.CREATE_FEED_REQUEST: {
      return {
        ...state,
        creating: true
      }
    }
    case Actions.CREATE_FEED_SUCESS: {
      return {
        ...state,
        creating: false
      }
    }
    case Actions.CREATE_FEDD_FAIL: {
      return {
        ...state,
        creating: false
      }
    }
    case Actions.VOTE_UP: {
      const feeds = state.feeds

      const newFeeds = feeds.map(feed => { 
        if(feed.id === action.feedId) {
          
          const x  = {
            ...feed,
            voteUp: feed.voteUp+1,
            currentUserLiked: true
          }
          console.log(x, "locatio feeds")
          return x
        }else {
          return feed
        }
      })

      return {
        ...state,
        feeds:newFeeds
      }
    }
      
    case Actions.VOTE_DOWN: {
      const feeds = state.feeds

      const newFeeds = feeds.map(feed => { 
        if(feed.id === action.feedId) {
          
          const x  = {
            ...feed,
            voteUp: feed.voteUp-1,
            currentUserLiked: false
          }
          console.log(x, "locatio feeds")
          return x
        }else {
          return feed
        }
      })

      return {
        ...state,
        feeds:newFeeds
      }

    }
    default : 
      return state
  }
}