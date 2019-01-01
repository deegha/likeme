
/**
 * Created by Deegha on 26/09/2018
 */

const baseUrl = "http://localhost:5000/like-me-65680/us-central1/"

const headers = {
  "Content-Type": "application/json",
  "Accept" : "application/json"
}

const GET = async(path) => {
  
  console.log('get', baseUrl+path )
  return fetch(baseUrl+path, {
    headers: headers
  }).then(checkStatusAndGetJSON)
}

const POST = async (path, data) => {

  console.log('post', baseUrl+path)
  return fetch(baseUrl+path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data) 
  }).then(checkStatusAndGetJSON)
}   


import Fire  from "./firebase"

export const getFeeds = (userGeo) =>  {
  return Fire.database().ref("feeds").child(userGeo).once("value")
}

export const getAllFeeds = () => Fire.database().ref("feeds").once("value")

export const createFeed = (feed, postGeo) => Fire.database().ref(`feeds/${postGeo}`).push(feed)

export const getUserById = (id) => Fire.database().ref("users").orderByChild('id').equalTo(id).once("value") 

export const createUser = (id, userObj) => Fire.database().ref(`users/${id}`).set(userObj)

export const voteUp = (id) =>  Fire.database().ref(`feeds/${id}/vote`).push(id)

export const setPushToken = (token, userID) => Fire.database().ref(`users/${userID}/notificationToken`).update(token)

export const getFeedsByUser = (userID) => POST('getFeedsByuser')
















// export const createProduct = product => Fire.database().ref("products").push(product)
// export const getProduct = product_id => Fire.database().ref("products").orderByChild('id').equalTo(product_id).once("value") 
// export const getMakesList  = _=> Fire.database().ref("make").once("value")