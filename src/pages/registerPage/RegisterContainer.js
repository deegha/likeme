import React from  'react'
import { connect } from 'react-redux'
import { RegisterView } from './RegisterView'
import { ImagePicker, Permissions } from 'expo'
import { Animated, Easing, Keyboard } from 'react-native'

import Fire  from '../../services/firebase'
import { validateEmail } from '../../services/helpers'
import { authenticate } from '../../actions/authActions'
import { UserModel } from '../../dataModels/user'
import { createUser } from '../../services/backendClient'
import { uploadImageAsync } from '../../services/utils'

import { verticalScale, moderateScale } from '../../components/sharedStyles'

const INITIAL_IMAGE_MARGIN = verticalScale(30)
const INITIAL_IMAGE_WIDTH = verticalScale(90)
const END_IMAGE_WIDTH = verticalScale(70)
const INITIAL_IMAGE_TEXT = moderateScale(12)
class RegisterContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      imageMargin: new Animated.Value(INITIAL_IMAGE_MARGIN),
      imageWidth: new Animated.Value(INITIAL_IMAGE_WIDTH),
      imageText: new Animated.Value(INITIAL_IMAGE_TEXT),
      propic: '',
      name: '',
      email:'',
      password: '',
      confirmpassword: '',
      formError: '',
      validForm: false,
      creating: false
    }
  }

	// static navigationOptions = {
  //   title: 'Signup'
  // }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  componentDidUpdate(preProps) {
		const { authenticated } = this.props.auth
		if(authenticated && authenticated !== preProps.auth.authenticated) {
			this.props.navigation.navigate('home')
		}
	}

  keyboardDidShow = () => {
		this.feildOnfocus()
  }

  keyboardDidHide = () => {
		this.feildOnBlur()
  }

  feildOnfocus = () => {
		Animated.timing(                  
      this.state.imageMargin,            
      {
        toValue: 5,    
        easing: Easing.back(),              
        duration: 300,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageWidth,            
      {
        toValue: END_IMAGE_WIDTH,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageText,            
      {
        toValue: 9,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
	}

	feildOnBlur = () => {
		Animated.timing(                  
      this.state.imageMargin,            
      {
        toValue: INITIAL_IMAGE_MARGIN,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageWidth,            
      {
        toValue: INITIAL_IMAGE_WIDTH,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageText,            
      {
        toValue: INITIAL_IMAGE_TEXT,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
		
	}
   
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    await Permissions.askAsync(Permissions.CAMERA)
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
    })

    if (!result.cancelled) {
      this.setState({ propic: result.uri })
    }
  }

  setFormError = (message) => this.setState({formError : message})

  onSubmit = () => {
    this.setState({creating: true})
    if(this.state.propic === "") {
      this.setFormError("Should upload a profile picture")
      this.setState({creating: false})
      return  false
    }

    if(this.state.email === "" || this.state.password === "") {
      this.setFormError("Email and password are requied")
      this.setState({creating: false})
      return  false
    }

    Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      const user = UserModel
      console.log('uploading Image')
      uploadImageAsync(this.state.propic, 'userImages')
        .then(photoUrl => {
        
        Fire.auth().currentUser.sendEmailVerification()  

        user.id = res.user.uid
        user.displayName = this.state.name
        user.email = res.user.email
        user.image = photoUrl
        
        console.log('Creating user')
        createUser(
          res.user.uid,
          user
        )

        this.props.authenticate(user)

        this.setState({creating: false})
      })

    }).catch(err => {
      this.setFormError(err.message)
      this.setState({creating: false})
    })
  }

  onChange = (feild, value) => this.setState(
    {[feild]: value, setFormError: ""}, () => this.validateForm()
  )

  validateForm = () => {
   
    ( validateEmail(this.state.email) 
      && this.state.password !== '')? this.setState({validForm: true}): this.setState({validForm: false})
	}


  render() {
     
    const { imageMargin,imageWidth, imageText,validForm } = this.state

    return (
      <RegisterView 
        imageMargin={imageMargin}
        imageWidth={imageWidth}
        imageText={imageText}
        validForm={validForm}

        creating={this.state.creating}
        formError={this.state.formError}
        onSubmit={this.onSubmit}
        onChange={this.onChange} 
        pickImage={this.pickImage} 
        data={this.state}/>
    )
  }
}

const mapStateToProps = ({auth}) => ({
	auth
})

const mapDispatchToProps = (dispatch) => ({
	authenticate: (user) => dispatch(authenticate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer) 
