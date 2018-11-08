import React from 'react'
import { connect } from 'react-redux'
import { ImagePicker, Permissions } from 'expo'

import { CreatePost } from './CreatePost'
// import { createFeed } from '../../../../services/backendClient'
import { uploadImageAsync } from '../../../../services/utils'
import { createFeedAction, createFeedRequest } from '../../../../actions/feedsActions'

import { FeedModel } from '../../../../dataModels/feed'

class CreatepostContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {

			postText: "",
			postType: null,
			userID: "iaIpVuopiZdrzcgXSuKpT8W22eU2",
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
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
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
			feed.createdAt = Date.now()
			feed.postText  = this.state.postText
			feed.postMedia.type = 'text'
			feed.userID	= this.state.userID

			this.props.createFeed(feed)
		}

		uploadImageAsync(this.state.postMedia.url, 'postImages')
			.then(medaUrl => {

				const feed = FeedModel

				feed.createdAt = Date.now()
				feed.postText  = this.state.postText
				feed.postMedia.type = this.state.postMedia.type
				feed.postMedia.url	= medaUrl
				feed.userObj.userID	= this.props.currentUser.id
				feed.userObj.image	= this.props.currentUser.profileImage
				feed.userObj.displayName = this.props.currentUser.name

				this.props.createFeed(feed)
					
			})
			.catch(err => console.log(err))
	}

	onTextChange = (text) => this.setState({postText:text})

	pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
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
		const { postText, postMedia } = this.state

		return <CreatePost
							postMedia={postMedia}
							disabled={postText !== '' || postMedia.url !== ''?false:true}
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
	createFeed : (data) => dispatch(createFeedAction(data)),
	createFeedRequest: () => dispatch(createFeedRequest())
})

export default connect(mapStateToProps, mapdispatchToProps)(CreatepostContainer) 