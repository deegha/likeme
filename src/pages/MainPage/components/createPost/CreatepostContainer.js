import React from 'react'
import { connect } from 'react-redux'
import { ImagePicker, Permissions, Location } from 'expo'

import { CreatePost } from './CreatePost'
// import { createFeed } from '../../../../services/backendClient'
import { uploadImageAsync } from '../../../../services/utils'
import { createFeedAction, createFeedRequest } from '../../../../actions/feedsActions'

import { FeedModel } from '../../../../dataModels/feed'



import * as firebase from 'firebase/app'
import Fire  from '../../../../services/firebase'
import * as geofirex from 'geofirex'

class CreatepostContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			location: null,
			errorMessage: null,
			title: "",
			info: "",
			postType: null,
			userID: "",
			postMedia: {
				url:"",
				type:""
			}
		}
	}

	async componentDidMount() {
		// if(!this.prop.authenticated) {
		// 	this.props.navigation.navigate('login')
		// }
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
		await Permissions.askAsync(Permissions.CAMERA)
		this.getLocationAsync()
  }

	componentDidUpdate() {
		if(!this.props.authenticated) {
			this.props.navigation.navigate('login')
		}
	}

	submitPost = () => {



		this.props.setModalVisible()
		this.props.createFeedRequest()
		if(this.state.postMedia.url === "") {
			const feed = FeedModel
			feed.location	= this.state.location
			feed.createdAt = Date.now()
			feed.title = this.state.title
			feed.postText  = this.state.info
			feed.postMedia.type = 'text'
			feed.userObj.image = this.props.currentUser.image
			feed.userObj	= this.props.currentUser.id
			feed.userObj.displayName = this.props.currentUser.displayName

			this.props.createFeed(feed)
		}

		uploadImageAsync(this.state.postMedia.url, 'postImages')
			.then(medaUrl => {

				const feed = FeedModel
				feed.location	= this.state.location
				feed.createdAt = Date.now()
				feed.title = this.state.title
				feed.postText  = this.state.info
				feed.postMedia.type = this.state.postMedia.type
				feed.postMedia.url	= medaUrl
				feed.userObj.userID	= this.props.currentUser.id
				feed.userObj.image = this.props.currentUser.image
				feed.userObj.displayName = this.props.currentUser.displayName

				this.props.createFeed(feed)
					
			})
			.catch(err => console.log(err))
	}

	onTextChange = (value) => this.setState(
    {info : value}
	)
	
	getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

	pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			// aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({ postMedia: { url: result.uri, type: result.type } });
    }
	}
	
	takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true
		});
	

		if (!result.cancelled) {
      this.setState({ postMedia: { url: result.uri, type: result.type } });
    }
  }

	render() {
		const { postText, postMedia, title } = this.state
		return <CreatePost
							postMedia={postMedia}
							disabled={false}
							postText={postText} 
							pickImage={this.pickImage}
							takePhoto={this.takePhoto}
							onTextChange={this.onTextChange} 
							submitPost={this.submitPost} />
	}
}

const mapStateToProps = ({auth}) => ({
	currentUser: auth.user,
	authenticated: auth.authenticated
})

const mapdispatchToProps = (dispatch) => ({
	createFeed : (data, id) => dispatch(createFeedAction(data, id)),
	createFeedRequest: () => dispatch(createFeedRequest())
})

export default connect(mapStateToProps, mapdispatchToProps)(CreatepostContainer) 