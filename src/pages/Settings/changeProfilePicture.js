import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

import { uploadImageAsync } from '../../services/utils'
import { RoundBtn } from '../../components'
import { updateProfilePic } from '../../services/backendClient'
import { updatePorfilepicAction } from '../../actions/authActions'
 
class ChangeProfileicture extends React.PureComponent {
  static navigationOptions = {
		title: 'Change Profile Picture'
  }
  state = {
    propic: '',
    loading: false
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    await Permissions.askAsync(Permissions.CAMERA)
  }

  pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
    })

    if (!result.cancelled && result.type ===  "image") {
      this.setState({ propic: result.uri })
    }
  }

  onSubmit = () => {
    this.setState({loading: true})
    uploadImageAsync(this.state.propic, 'userImages')
      .then(photoUrl => {
        updateProfilePic(photoUrl, this.props.user.id)
        return photoUrl
      })
      .then( image => {
        this.props.updateAuthImage(image)
        this.setState({loading: false})
      })
      .catch(err => {
        console.log(err)
        this.setState({loading: false})
      })

  }

  render () {
    const { loading, propic } = this.state

    return (
      <View style={styles.container} >
        <TouchableOpacity style={styles.box} onPress={this.pickImage}>
          { propic ? <Image source={{ uri: propic }}  style={styles.image}/>: <View /> }
        </TouchableOpacity>

        <View style={styles.btnContainer}>
        <RoundBtn 
          disabled={propic === ''} 
          loading={loading} 
          onPress={this.onSubmit} 
          color={'#00bcd4'}>
          Update Photo
        </RoundBtn> 
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ auth: {user} }) => ({
  user
})

const mapDispatchToProps = (disptch) => ({
  updateAuthImage: (image) => disptch(updatePorfilepicAction(image)) 
})

export default connect (mapStateToProps, mapDispatchToProps)(ChangeProfileicture)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  box: {
    backgroundColor: '#ecf0f1',
    width: 150,
    height: 150,
    borderRadius: 40,
    overflow:'hidden',
    elevation: 5
  },
  btnContainer : {
    marginTop: 50,
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
    height:50,
  },
  image: {
    width: '100%',
    height: '100%'
  }
}) 