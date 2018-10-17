/**
 * Created by deegha
 */

import * as Actions from '../actions/feedsActions'

const initialState = {
  feeds : [
    {
      id: null,
      postText: "",
      postMedia: {
        type: null,
        url: ""
      }
    }
  ],
  loading: false
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
        loading: true
      } 
    case Actions.FETCH_FEEDS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        feeds: [
          ...Object.keys(action.feeds).map(feed => ({
            id: feed,
            postText: action.feeds[feed].postText,
            postMedia: {
              type: action.feeds[feed].postMedia.type,
              url: action.feeds[feed].postMedia.url
            }
          }))
        ]
      }
    default : 
      return state
  }
}