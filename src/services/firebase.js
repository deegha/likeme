import firebase from 'firebase'
import { firebaseConfig } from "./fireConfig"

const Fire = firebase.initializeApp(firebaseConfig)

export const facebookProvider = new firebase.auth.FacebookAuthProvider() 
export const LogOut = ()  => Fire.auth().signOut()
export default Fire 