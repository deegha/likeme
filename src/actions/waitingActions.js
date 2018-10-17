/**
 * Created by deegha on 6/10/2018
 */

 export const SET_WATING_ACTION = 'SET_WATING_ACTION'
 export const CLEAR_WATING_ACTION = 'CLEAR_WATING_ACTION' 

 export const setWatingAction = (waitingAction, params) => {
  // console.log(watingAction,params )
  return  ({
    type: SET_WATING_ACTION,
    waitingAction,
    params
 })
 }

 export const clearWatingAction = () => ({
   type: CLEAR_WATING_ACTION
 })
 