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
      const unOrderdFeeds = [
        ...Object.keys(action.feeds).map(feed => ({
          id: feed,
          location: action.feeds[feed].location,
          createdAt: action.feeds[feed].createdAt,
          postText: action.feeds[feed].postText,
          postMedia: {
            type: action.feeds[feed].postMedia.type,
            url: action.feeds[feed].postMedia.url
          },
          userObj: {
            id: action.feeds[feed].userObj.userID,
            name: action.feeds[feed].userObj.displayName,
            image: action.feeds[feed].userObj.image
          },
          voteUp: action.feeds[feed].voteup  
        }))
      ]

      const sortedIndex = [
        ...Object.keys(unOrderdFeeds).sort((a, b) => {
          return  unOrderdFeeds[b].createdAt - unOrderdFeeds[a].createdAt 
        } )
      ]
      return {
        ...state,
        loading: false,
        feeds: [ ...state.feeds ,...sortedIndex.map(index => unOrderdFeeds[index])]
      }
    
    default : 
      return state
  }
}