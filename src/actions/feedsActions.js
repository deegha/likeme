/**
 * Created by deegha
 */

import { getFeeds } from '../services/backendClient'

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

export const fetchFeeds = () => dispatch => {
	dispatch(fetchFeedsRequest())   
	getFeeds()
		.then(feeds => {
			dispatch(fetchFeedsRequestSuccess(feeds.val()))
		})
		.catch(err => console.log(err))
}
