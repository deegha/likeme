/**
 * Created by deegha
 */

import { getFeeds, createFeed, voteUp, getAllFeeds, getFeedsByUser } from '../services/backendClient'

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

export const fetchFeeds = (userGeo, neighboursArr) => async (dispatch) => {
	dispatch(fetchFeedsRequest())   

	try {
		const res = await getFeeds(userGeo)
		const feeds = res.val()
		if(feeds) {
			dispatch(fetchFeedsRequestSuccess(feeds))
		}else {
			dispatch(fetchFeedsRequestFail())
		}

		neighboursArr.map( geo => {
			getFeeds(geo)
			.then( res => {
				if(res.val() !== null) {
					dispatch(fetchFeedsRequestSuccess(res.val()))
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

export const fetchAllFeeds = () => async (dispatch) => {
	dispatch(fetchFeedsRequest())   
	
	try {
		const res = await getAllFeeds()	
		const feeds = res.val()
		let collection = {}
		Object.keys(feeds).map( feedIndex => {
			collection = {...collection,...feeds[feedIndex]}
		})

		dispatch(fetchAllFeedsRequestSuccess(collection))
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

export const createFeedAction = (feed, postGeo, curLocation) => dispatch => {
	dispatch(createFeedRequest())

	createFeed(feed, postGeo)
		.then(res => {

			getAllFeeds()
			.then(res => {
				const feeds = res.val()
				let collection = {}
				Object.keys(feeds).map( feedIndex => {
					collection = {...collection,...feeds[feedIndex]}
				})
				dispatch(fetchAllFeedsRequestSuccess(collection))
			})

			getFeeds(curLocation)
			.then(feeds => {
				dispatch(fetchFeedsRequestSuccess(feeds.val()))
				dispatch(createFeedSucess())
			})
			
		})
		.catch(err => {
			console.log(err, "error in creating post")
			dispatch(createFeedFail())
		})
}

const voteUpState = (feedId, userid) => ({
	type: VOTE_UP,
	feedId,
	userid
}) 

export const voteUpAction = (feedId) => (dispatch, getState) => {

	const userID = getState().auth.user.id
	voteUp(feedId,userID)
	.then( () => dispatch(voteUpState(feedId, userID)))
	.catch(err => console.log(err))

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

