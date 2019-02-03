export const FeedModel = {
  id: 1,
  createdAt : 0,
  title: '',
  postText: '',
  postMedia: {
    type: "",
    url: ""
  },
  location: false,
  shares:0,
  reported: false,
  status: 'active',
  actions: false,
  privacy: 'public',
  category: 'open',
  userObj: {
    userID: 0,
    image: '',
    displayName: ''
  },
}