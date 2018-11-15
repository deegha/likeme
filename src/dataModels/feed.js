export const FeedModel = {
  createdAt : 0,
  title: '',
  postText: '',
  postMedia: {
    type: "",
    url: ""
  },
  voteup: 0,
  vateDown: 0,
  location: false,
  shares:0,
  reported: false,
  status: 'active',
  actions: false,
  privacy: 'public',
  userObj: {
    userID: 0,
    image: '',
    displayName: ''
  },
}