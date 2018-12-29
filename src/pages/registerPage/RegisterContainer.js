import React from  'react'

import { RegisterView } from './RegisterView'
import { ImagePicker, Permissions } from 'expo'
import { Animated, Easing, Keyboard } from 'react-native'

import Fire  from '../../services/firebase'
import { validateEmail } from '../../services/helpers'

import { UserModel } from '../../dataModels/user'
import { createUser } from '../../services/backendClient'
import { uploadImageAsync } from '../../services/utils'

class RegisterContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      imageMargin: new Animated.Value(30),
      imageWidth: new Animated.Value(90),
      imageText: new Animated.Value(12),
      propic: '',
      name: '',
      email:'',
      password: '',
      confirmPassword: '',
      formError: '',
      validForm: false,
      creating: false
    }
  }

	static navigationOptions = {
    title: 'Signup'
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
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
        toValue: 70,    
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
        toValue: 30,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageWidth,            
      {
        toValue: 90,    
        easing: Easing.back(),              
        duration: 400,              
      }
    ).start()
    Animated.timing(                  
      this.state.imageText,            
      {
        toValue: 15,    
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
    // if(this.state.password !== this.state.confirmPassword) {
    //   this.setFormError("Password mismatch")
    //   return  false
    // }

    if(this.state.email === "" || this.state.password === "") {
      this.setFormError("Email and password are requied")
      return  false
    }

    Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      const user = UserModel

      uploadImageAsync(this.state.propic, 'userImages')
        .then(photoUrl => {

        user.id = res.user.uid
        user.displayName = this.state.name
        user.email = res.user.email
        user.image = photoUrl

        createUser(
          res.user.uid,
          user
        )
        this.setState({creating: false})
      })

    }).catch(err => {
      this.setFormError(err.message)
      this.setState({creating: false})
    })
  }

  onChange = (feild, value) => this.setState(
    {[feild]: value, setFormError: ""}, ()=> this.validateForm()
  )

  validateForm = () => {
   
    (validateEmail(this.state.email)  
      && this.state.password !== ''
      // && this.state.password === this.state.confirmPassword
      && this.state.confirmPassword !== '')? this.setState({validForm: true}): this.setState({validForm: false})

      console.log( this.state.confirmPassword)
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


export default RegisterContainer