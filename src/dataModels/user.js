  export const UserModel =  {
    id: "",
    displayName : "",
    email: "",
    type: "consumer",
    image: "", 
    friends: false, //user ids of the friends
    numPosts: 0, // number of posts the user has posted
    shares: 0, //post ids which the user has shared
    reported: false, // post ids the user has reported
    beingReported: false, //user ids of the reporters
    openedApp: 0, // total number of times the user has opened the app
  } 