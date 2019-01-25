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

      const newArray = [...state.feeds, ...action.feeds]

      const getUnique = (arr, comp) => {

        const unique = arr
          .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
      }

      return {
        ...state,
        loading: false,
        feeds: getUnique(newArray, 'id')
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
          console.log(x, "locatio feeds")
          return x
        }else {
          return feed
        }
      })

      // console.log(newFeeds, "location new feeds")

      return {
        ...state,
        feeds:newFeeds
      }
    default : 
      return state
  }
}