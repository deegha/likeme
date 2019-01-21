/**
 * Created by deegha
 */

import { getFeeds, createFeed, voteUp, getAllFeeds, getFeedsByUser, getFeedsLikedByUser } from '../services/backendClient'

/**
 * 
 * Feeds action
 * 
*/

export const FETCH_FEEDS_REQUEST = 'FETCH_FEEDS_REQUEST'
export const FETCH_FEEDS_REQUEST_FAIL = 'FETCH_FEEDS_REQUEST_FAIL'
export const FETCH_FEEDS_REQUEST_SUCCESS = 'FETCH_FEEDS_REQUEST_SUCCESS'

export const FETCH_ALL_FEEDS_REQUEST = 'FETCH_ALL_FEEDS_REQUEST'
export const FETCH_ALLFEEDS_REQUEST_FAIL = 'FETCH_ALLFEEDS_REQUEST_FAIL'
export const FETCH_ALLFEEDS_REQUEST_SUCCESS = 'FETCH_ALLFEEDS_REQUEST_SUCCESS'

export const FETCH_USER_FEEDS_REQUEST = 'FETCH_USER_FEEDS_REQUEST'
export const FETCH_USER_FEEDS_SUCCESS = 'FETCH_USER_FEEDS_SUCCESS'
export const FETCH_USER_FEEDS_FAIL = 'FETCH_USER_FEEDS_FAIL'

export const FETCH_USER_LIKED_FEEDS_REQUEST = 'FETCH_USER_LIKED_FEEDS_REQUEST'
export const FETCH_USER_LIKED_FEEDS_SUCCESS = 'FETCH_USER_LIKED_FEEDS_SUCCESS'
export const FETCH_USER_LIKED_FEEDS_FAIL = 'FETCH_USER_LIKED_FEEDS_FAIL'

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

export const fetchFeeds = (userGeo, neighboursArr) => async (dispatch, getState) => {
	dispatch(fetchFeedsRequest())   

	try {
		const { auth: {user: {id}} } = getState()

		const res = await getFeeds(userGeo, id)
		const feeds = res.data
		if(feeds) {
			dispatch(fetchFeedsRequestSuccess(feeds))
		}else {
			dispatch(fetchFeedsRequestFail())
		}

		neighboursArr.map( geo => {
			getFeeds(geo, id)
			.then( res => {
				if(res.data) {
					dispatch(fetchFeedsRequestSuccess(res.data))
				}
			})
		})

	}catch(err) {
		dispatch(fetchFeedsRequestFail())
		console.log(err, "fetch feeds")
	}
}

export const fetchAllFeedsRequest = () => ({
	type: FETCH_ALL_FEEDS_REQUEST
})

export const fetchAllFeedsRequestFail = () => ({
	type: FETCH_ALLFEEDS_REQUEST_FAIL
})

export const fetchAllFeedsRequestSuccess = (feeds) => ({
	type: FETCH_ALLFEEDS_REQUEST_SUCCESS,
	feeds
})

export const fetchAllFeeds = () => async (dispatch, getState) => {
	dispatch(fetchFeedsRequest())   
	
	try {

		const { auth: {user: {id}} } = getState()

		const res = await getAllFeeds(id, null)	
		const feeds = res.data
		dispatch(fetchAllFeedsRequestSuccess(feeds))
	}catch(err) {
		console.log(err)
	}
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

export const createFeedAction = (feed, postGeo, curLocation) => (dispatch, getState) => {
	dispatch(createFeedRequest())
	const { auth: {user: {id}} } = getState()
	createFeed(feed, postGeo)
		.then(res => {
			
			getAllFeeds()
			.then(res => {
				const feeds = res.data
				dispatch(fetchAllFeedsRequestSuccess(feeds))
			})

			getFeeds(curLocation, id)
			.then(feeds => {
				dispatch(fetchFeedsRequestSuccess(feeds.data))
				dispatch(createFeedSucess())
			})
			
		})
		.catch(err => {
			console.log(err, "error in creating post")
			dispatch(createFeedFail())
		})
}

const voteUpState = (feedId) => ({
	type: VOTE_UP,
	feedId
}) 

export const voteUpAction = (feedId) =>  (dispatch, getState) => {

	const { auth: {user: {id, displayName}} } = getState()
	voteUp(feedId,{id, displayName})
	.catch(err => console.log(err) )

}

const fetchUserFeedsRequest = () => ({
	type: FETCH_USER_FEEDS_REQUEST	
})

const fetchUserFeedsSuccess = (feeds) => ({
	type: FETCH_USER_FEEDS_SUCCESS,
	feeds
})

const fetchUserFeedsFail = () => ({
	type: FETCH_USER_FEEDS_FAIL	
})

export const fetchUserFeeds = (userId) => async (dispatch) => {
	dispatch(fetchUserFeedsRequest())

	try {
		const feeds = await getFeedsByUser(userId)
		dispatch(fetchUserFeedsSuccess(feeds.data))
	}catch(err) {
		dispatch(fetchUserFeedsFail())
		console.log(err)
	}
}

const fetchUserLikedFeedsRequest = () => ({
	type: FETCH_USER_LIKED_FEEDS_REQUEST
})

const fetchUserLikedFeedsFail = () => ({
	type: FETCH_USER_LIKED_FEEDS_FAIL
})

const fetchUserLikedFeedsSuccess = (feeds) => ({
	type: FETCH_USER_LIKED_FEEDS_SUCCESS,
	feeds
})

export const fetchUserLikedFeeds = (userId) => async (dispatch) => {
	dispatch(fetchUserLikedFeedsRequest())

	try {
		const likedFeedSnap = await getFeedsLikedByUser(userId)
		dispatch(fetchUserLikedFeedsSuccess(likedFeedSnap.data))
	}catch(err) {
		console.log(err)
	}
}
