/**
 * Created by deegha
 */


import * as Actions from "../actions/authActions"

const initial_state = {
		user: {},
		authenticated : false,
		loading: false
}

export const authenticationReducer = (state = initial_state, action) => {
	switch (action.type) {
		case Actions.AUTHENTICATE_REQUEST: 
			return {
				...state,
				loading:true
			}
		case Actions.AUTHENTICATE : 
			return {
				user: action.user,
				authenticated : true,
				loading: false
			}
		case Actions.LOG_OUT: 
			return initial_state
		case Actions.UPDATE_PROPIC:
			return {
				...state,
				user: {
					...state.user,
					image: action.image
				}
			}
		default :
			return state 
	}
}