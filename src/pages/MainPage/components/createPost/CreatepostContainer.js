import React from 'react'
import { ImagePicker, Permissions } from 'expo'

import { CreatePost } from './CreatePost'
import { createFeed } from '../../../../services/backendClient'
import { uploadImageAsync } from '../../../../services/utils'

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
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

	submitPost = () => {
		this.props.setModalVisible()

		uploadImageAsync(this.state.postMedia.url, 'postImages')
			.then(medaUrl => {
				const data = {
					postText: this.state.postText,
					postMedia: {
						type: this.state.postMedia.type,
						url: medaUrl
					},
					userID: this.state.userID
				}
				
				createFeed(data)
			})
			.catch(err => console.log(err))
	}

	onTextChange = (text) => this.setState({postText:text})

	pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    })

    if (!result.cancelled) {
      this.setState({ postMedia: { url: result.uri, type: result.type } });
    }
	}
	
	takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true
		});
		
		console.log(result)

		if (!result.cancelled) {
      this.setState({ postMedia: { url: result.uri, type: result.type } });
    }
  }

	render() {
		const { postText, postMedia } = this.state
		return <CreatePost
							postMedia={postMedia}
							disabled={postText === ''?true:false}
							postText={postText} 
							pickImage={this.pickImage}
							takePhoto={this.takePhoto}
							onTextChange={this.onTextChange} 
							submitPost={this.submitPost} />
	}
}

export default CreatepostContainer