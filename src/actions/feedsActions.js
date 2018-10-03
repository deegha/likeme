/**
 * Created by deegha
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

export const fetchFeedsRequestSuccess = () => ({
    type: FETCH_FEEDS_REQUEST_SUCCESS
})

export const fetchFeeds = () => dispatch => {
    dispatch(fetchFeedsRequest())   
}
