/**
 * Created by deegha on 6/10/2018
 */

import * as Actions from '../actions/waitingActions'

const initialState = {
  waitingAction: '',
  params : {}
}

export const waitingActionReducer = (state=initialState, action) => {
  switch(action.type) {
    case Actions.SET_WATING_ACTION:
      return {
        waitingAction: action.waitingAction,
        params: action.params
      }
    case Actions.CLEAR_WATING_ACTION: 
      return {
        waitingAction: '',
        params: {
          action: '', 
          id: ''
        }
      }
    default: return state
  }
}
