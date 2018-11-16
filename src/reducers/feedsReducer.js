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
      },
      createdAt: '',
      userObj: {
        id: '',
        name: '',
        image: ''
      },
      voteUp:{}
    }
  ],
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
        loading: true
      } 
    case Actions.FETCH_FEEDS_REQUEST_SUCCESS:
      const unOrderdFeeds = [
        ...Object.keys(action.feeds).map(feed => ({
          id: feed,
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
          voteUp: action.feeds[feed].voteup !== false ? action.feeds[feed].voteup: {} 
        }))
      ]

      const sortedIndex = [
        ...Object.keys(unOrderdFeeds).sort((a, b) => {
          return  unOrderdFeeds[b].createdAt - unOrderdFeeds[a].createdAt 
        } )
      ]
console.log("on reducer feed")
      return {
        ...state,
        loading: false,
        feeds: [...sortedIndex.map(index => unOrderdFeeds[index])]
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

      const feed = state.feeds.filter( feed => feed.id === action.feedId )
      const newVote = {}
      console.log(feed.voteUp)
      if(feed.voteUp === false) {
        newVote = { 0 : action.userid}
      } else {
        const key = Object.keys(feed.voteUp).length
        newVote = { key : action.userid}
      }
      return {
        ...state,
        feeds: [
          ...state.feeds.map(feed => {
            if(feed.id === action.feedId) {
              return {
                ...feed,
                voteUp: newVote
              }
            }

            return feed
          })
        ]
      }
    }
    default : 
      return state
  }
}