
/**
 * Created by Deegha on 26/09/2018
 */

import Fire  from "./firebase"

export const getFeeds = () => Fire.database().ref("feeds").once("value")   
export const createFeed = (feed) => Fire.database().ref("feeds").push(feed)

// export const createProduct = product => Fire.database().ref("products").push(product)
// export const getProduct = product_id => Fire.database().ref("products").orderByChild('id').equalTo(product_id).once("value") 
// export const getMakesList  = _=> Fire.database().ref("make").once("value")

export const createUser = (id, username, email) => Fire.database().ref(`users/${id}`).set({
                                                        username,
                                                        email,
                                                    });