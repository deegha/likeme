export const FeedModel = {
  createdAt : 0,
  postText: '',
  postMedia: {
    type: "",
    url: ""
  },
  voteup: 0,
  vateDown: 0,
  shares:0,
  reported: false,
  status: 'active',
  actions: false,
  privacy: 'public',
  userObj: {
    userID: 0,
    image: '',
    displayName: ''
  }
}