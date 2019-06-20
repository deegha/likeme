
/**
 * Created by Deegha on 26/09/2018
 */

const baseUrl = "https://us-central1-like-me-65680.cloudfunctions.net/"

const headers = {
  "Content-Type": "application/json",
  "Accept" : "application/json"
}

const GET = async(path) => {
  
  console.log('get', baseUrl+path )
  return fetch(baseUrl+path, {
    headers: headers
  })
}

const POST = async (path, data) => {

  console.log('post', baseUrl+path, data)
  const result = await fetch(baseUrl+path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data) 
  })

  return await result.json()
}   

import Fire  from "./firebase"

export const getFeeds = (userGeo, userId) => POST('getFeedsByGEO', {userGeo, userId})

export const getAllFeeds = (userId, nextRef) => POST('getAllFeeds', {userId, nextRef})

export const voteUp = (feedId, user) =>  POST('likeFeed',  { user, feedId })

export const voteDown = (feedId, user) =>  POST('removeLike',  { user, feedId })

export const createFeed = (feed, postGeo) => Fire.database().ref(`feeds/${postGeo}`).push(feed)

export const getUserById = (id) => Fire.database().ref("users").orderByChild('id').equalTo(id).once("value") 

export const createUser = (id, userObj) => Fire.database().ref(`users/${id}`).set(userObj)

export const setPushToken = (token, userID) => Fire.database().ref(`users/${userID}/notificationToken`).update(token)

export const getFeedsByUser = (userId) => POST('getFeedsByuser', {userId})

export const getFeedsLikedByUser = (userId) => POST('likedFeeds', {userId})

export const updateProfilePic = (imageUrl, userId) => {
  console.log(imageUrl, userId)
  Fire.database().ref(`users/${userId}`).update({ image: imageUrl })
}

















// export const createProduct = product => Fire.database().ref("products").push(product)
// export const getProduct = product_id => Fire.database().ref("products").orderByChild('id').equalTo(product_id).once("value") 
// export const getMakesList  = _=> Fire.database().ref("make").once("value")