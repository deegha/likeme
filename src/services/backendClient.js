
/**
 * Created by Deegha on 26/09/2018
 */

import Fire  from "./firebase"

export const getFeeds = (userGeo) =>  {
  console.log(userGeo, "userGeo")
  return Fire.database().ref("feeds").child(userGeo).once("value")
}

export const getAllFeeds = () => Fire.database().ref("feeds").once("value")

export const getSecondaryFeeds = (keys) => {

  // return keys.map(key => Fire.database().ref("feeds").child(key).once("value"))
  let promises =  keys.map(key => Fire.database().ref("feeds").child(key).once("value"))


  return Promise.resolve(promises) 
  // return Promise.all(promises).then(snapshots => {
  //   snapshots.forEach(snapshot => {
  //     if(snapshot.val() !== null){
  //       return snapshot.val()
  //     }
  //   })
  // })
} 

export const createFeed = (feed, postGeo) => Fire.database().ref(`feeds/${postGeo}`).push(feed)

export const getUserById = (id) => Fire.database().ref("users").orderByChild('id').equalTo(id).once("value") 

export const createUser = (id, userObj) => Fire.database().ref(`users/${id}`).set(userObj)

export const voteUp = (id) =>  Fire.database().ref(`feeds/${id}/vote`).push(id)
















// export const createProduct = product => Fire.database().ref("products").push(product)
// export const getProduct = product_id => Fire.database().ref("products").orderByChild('id').equalTo(product_id).once("value") 
// export const getMakesList  = _=> Fire.database().ref("make").once("value")