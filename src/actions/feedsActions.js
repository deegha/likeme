/**
 * Created by deegha
 */

import { getFeeds, createFeed, voteUp, getSecondaryFeeds } from '../services/backendClient'

/**
 * 
 * Feeds action
 * 
*/

export const FETCH_FEEDS_REQUEST = 'FETCH_FEEDS_REQUEST'
export const FETCH_FEEDS_REQUEST_FAIL = 'FETCH_FEEDS_REQUEST_FAIL'
export const FETCH_FEEDS_REQUEST_SUCCESS = 'FETCH_FEEDS_REQUEST_SUCCESS'

export const fetchFeedsRequest = () => ({
	type: FETCH_FEEDS_REQUEST
})

export const fetchFeedsRequestFail = () => ({
	type: FETCH_FEEDS_REQUEST_FAIL
})

export const fetchFeedsRequestSuccess = (feeds) => ({
	type: FETCH_FEEDS_REQUEST_SUCCESS,
	feeds
})

export const fetchFeeds = (userGeo, neighboursArr) => dispatch => {
	dispatch(fetchFeedsRequest())   
	getFeeds(userGeo)
		.then(feeds => { 
			dispatch(fetchFeedsRequestSuccess(feeds.val()))
		})
		.catch(err => console.log(err))
}

/**
 * 
 * Single Feed actions
 * 
*/

export const CREATE_FEED_REQUEST 	= 'CREATE_FEED_REQUEST'
export const CREATE_FEED_SUCESS 	= 'CREATE_FEED_SUCESS'
export const CREATE_FEDD_FAIL			=	'CREATE_FEDD_FAIL'

export const VOTE_UP	= 'VOTE_UP'

export const createFeedRequest = () => ({
	type: CREATE_FEED_REQUEST
})

export const createFeedSucess = () => ({
	type: CREATE_FEED_SUCESS
})

export const createFeedFail = () => ({
	type: CREATE_FEDD_FAIL
})

export const createFeedAction = (feed, postGeo, curLocation) => dispatch => {
	createFeed(feed, postGeo)
		.then(res => {
			getFeeds(curLocation)
				.then(feeds => {
					dispatch(fetchFeedsRequestSuccess(feeds.val()))
					dispatch(createFeedSucess())
				})
				.catch(err => console.log(err))
		})
		.catch(err => dispatch(createFeedFail()))
}

const voteUpState = (feedId, userid) => ({
	type: VOTE_UP,
	feedId,
	userid
}) 

export const voteUpAction = (feedId) => (dispatch, getState) => {
	dispatch(voteUpState(feedId, getState().auth.user.id))

	
}

