import React from 'react'
import { connect } from 'react-redux'
import { ImagePicker, Permissions, Location } from 'expo'

import { CreatePost } from './CreatePost'
// import { createFeed } from '../../../../services/backendClient'
import { uploadImageAsync } from '../../../../services/utils'
import { createFeedAction, createFeedRequest } from '../../../../actions/feedsActions'

import { FeedModel } from '../../../../dataModels/feed'

import Geohash from 'latlon-geohash'

class CreatepostContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			location: {
				latitude: "",
				longitude: ""
			},
			currentUserLocation: {
				latitude: "",
				longitude: "",
				description: ""
			},
			errorMessage: null,
			falidForm: false,
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
		if(!this.prop.authenticated) {
			this.props.navigation.navigate('login')
		}
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
		await Permissions.askAsync(Permissions.CAMERA)
		this.getLocationAsync()
  }

	componentDidUpdate() {
		if(!this.props.authenticated) {
			this.props.navigation.navigate('login')
		}
	}

	setLocationPostLocation = (location, description) => {
		this.setState({location:{
			latitude: location.lat,
			longitude: location.lng,
			description
		}})
		console.log(location, "location")
	}

	submitPost = () => {
		const { latitude, longitude, description } = this.state.location
		const postGeo = Geohash.encode(latitude, longitude, 6)
		const curGeoHash = Geohash.encode(this.state.currentUserLocation.latitude, this.state.currentUserLocation.longitude, 6)

		console.log(postGeo, "postGeo")

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
			feed.userObj.userID	= this.props.currentUser.id
			feed.userObj.displayName = this.props.currentUser.displayName

			this.props.createFeed(feed, postGeo, curGeoHash)
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

				this.props.createFeed(feed, postGeo, curGeoHash)
					
			})
			.catch(err => console.log(err))
	}

	onTextChange = (value) => this.setState(
    {info : value}, ()=> this.validateForm()
	)
	
	validateForm = () => {
		(this.state.info !=='' || this.state.postMedia !=='' )? this.setState({falidForm: true}): this.setState({falidForm: false}) 
	}

	getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({})
		this.setState({ location, currentUserLocation:  {
			latitude:location.coords.latitude,
			longitude:location.coords.longitude
		}  })
		
  }

	pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			// aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({ falidForm: true, postMedia: { url: result.uri, type: result.type } })
    }
	}
	
	takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true
		});
	

		if (!result.cancelled) {
      this.setState({ falidForm: true, postMedia: { url: result.uri, type: result.type } })
    }
  }

	render() {
		const { postText, postMedia, currentUserLocation, falidForm } = this.state
		return <CreatePost
							location={this.state.location}
							setLocationPostLocation={this.setLocationPostLocation}
							postMedia={postMedia}
							disabled={!falidForm}
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

const mapDispatchToProps = (dispatch) => ({
	createFeed : (data, postGeo, curLocation) => dispatch(createFeedAction(data, postGeo, curLocation)),
	createFeedRequest: () => dispatch(createFeedRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatepostContainer) 