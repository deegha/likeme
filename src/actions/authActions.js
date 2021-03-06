/**
 * Created by deegha
 */

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOG_OUT = 'LOG_OUT'
export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
export const UPDATE_PROPIC = 'CHANGE_PROPIC'

export const authenticate = (user) => ({
    type : AUTHENTICATE,
    user
})

export const logout = _=> ({
    type :LOG_OUT
})  

export const authenticateRequest = () => ({
    type: AUTHENTICATE_REQUEST
})

export const updatePorfilepicAction = (image) => ({
    type: UPDATE_PROPIC,
    image
  })
