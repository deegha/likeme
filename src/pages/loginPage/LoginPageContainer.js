import React from 'react'
import { connect } from 'react-redux'
import { Animated, Easing, Keyboard } from 'react-native'
import Expo from 'expo'
import * as firebase from 'firebase'

import { LoginPageView } from './LoginPageView'
import Fire from '../../services/firebase'
import { USER_NOT_FOUND, PASS_NOT_EMPTY, EMAIL_NOT_EMPTY, EMAIL_PASS_EMPTY } from '../../services/errorConstants'
import { authenticate } from '../../actions/authActions'
import { getUserById, createUser } from '../../services/backendClient'
import { UserModel } from '../../dataModels/user'
import { validateEmail } from '../../services/helpers'

import  { moderateScale, scale, verticalScale } from '../../components/sharedStyles'

const INITIAL_TITLTE_MARGIN = verticalScale(50)
const INITIAL_TITLE_FONT = scale(34)
const INITIAL_DEVIDER_HEIGHT = verticalScale(80)

class LoginPageContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			titleMargin: new Animated.Value(INITIAL_TITLTE_MARGIN),
			titleFont: new Animated.Value(INITIAL_TITLE_FONT),
			deviderHeight: new Animated.Value(INITIAL_DEVIDER_HEIGHT),

			email: "",
			password: "",
			formError: "",
			loading: false,
			validForm: false,

			redirectAction: '',
			redirectPage: ''
		}
	} 
	static navigationOptions = {
		title: 'Login'
	}
	
	componentDidMount() {
		const redirectPage = this.props.navigation.getParam('page')
		const redirectAction = this.props.navigation.getParam('action')
		redirectAction && this.setState({redirectAction, redirectPage})
	}

	componentDidUpdate(preProps) {
		const { authenticated } = this.props.auth
		if(authenticated && authenticated !== preProps.auth.authenticated) {
			this.props.navigation.navigate('home')
		}
	}

	componentDidMount() {
		const { authenticated } = this.props.auth
		if(authenticated) {
			this.props.navigation.navigate('home')
		}
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


	navigateRegister = ()  => {
		this.props.navigation.navigate('register')
	}			

	onChange = (feild, value) => this.setState(
    {[feild]: value, setFormError: ""}, () => this.validateForm(feild, value)
	)
	
	validateForm = (field, value) => {
		(validateEmail(this.state.email)  && this.state.password !== '') ? this.setState({validForm: true}): this.setState({validForm: false})
	}

	setFormError = (message) => this.setState({formError : message})

	contiueWithFacebook = async event => {
		const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('282141632273767', 
		{permissions : ['public_profile']})

		if(type == 'success') {
			const credential =  firebase.auth.FacebookAuthProvider.credential(token)

			Fire.auth().signInAndRetrieveDataWithCredential(credential)
				.then(res => {
					if(res.additionalUserInfo.isNewUser) {
						const user = UserModel

						user.id = res.user.uid
						user.displayName = res.user.displayName
						user.email = res.user.email
						user.image = res.user.photoURL

						createUser(
							res.user.uid,
							user
						)
					}
					this.redirect()
				})
				.catch(err => console.log(err))
		}
	}


	redirect = () => {

		const { redirectAction, redirectPage } = this.state
				
		if(redirectAction !== '') {
			console.log(redirectAction, "redirect	")
			this.props.navigation.navigate(redirectPage, {action:redirectAction})
		}else {
			this.props.navigation.navigate('home')
		}
	}

	onSubmit = ()  => {
		this.setState({loading: true})
		const { email, password} = this.state

		if(email === '' || password === '') {
			this.setFormError(EMAIL_PASS_EMPTY)
			return
		}

		Fire.auth().fetchSignInMethodsForEmail(email)
			.then(providers => {
				if(providers.length === 0 ){
					this.setFormError(USER_NOT_FOUND)
				}else {
						return Fire.auth().signInWithEmailAndPassword(email,password)
				}
			})
			.then(user => {
				if(user !== undefined) {
					this.setFormError("")
					console.log('user singed in')
					this.setState({email: '', password: '', validForm: false})
				} 

				this.setState({loading: false})
				
			})
			.catch(err => {
				this.setState({loading: false})
				this.setFormError(err.message)
				console.log(err)
			})
	}

	feildOnfocus = () => {
		Animated.timing(                  
      this.state.titleMargin,            
      {
        toValue: 30,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
					
		Animated.timing(                  
      this.state.titleFont,            
      {
        toValue: 25,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()

		Animated.timing(                  
      this.state.deviderHeight,            
      {
        toValue: 10,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
	}

	feildOnBlur = () => {
		Animated.timing(                  
      this.state.titleMargin,            
      {
        toValue: INITIAL_TITLTE_MARGIN,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
					
		Animated.timing(                  
      this.state.titleFont,            
      {
        toValue: INITIAL_TITLE_FONT,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()

		Animated.timing(                  
      this.state.deviderHeight,            
      {
        toValue: INITIAL_DEVIDER_HEIGHT,    
        easing: Easing.back(),              
        duration: 400,              
      }
		).start()
	}

  render() { 
		const { formError, titleMargin,titleFont, deviderHeight,validForm } = this.state

		const titleSize = titleFont
		return <LoginPageView 
							titleMargin={titleMargin}
							titleSize= {titleSize}
							deviderHeight={deviderHeight}

							validForm={validForm}
							feildOnfocus={this.feildOnfocus}
							loading={this.state.loading}
							navigateRegister={this.navigateRegister}
							contiueWithFacebook={this.contiueWithFacebook}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
							formError={formError}/>
	}
}

const mapStateToProps = ({auth, waitingAction}) => ({
	auth,
	waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	authenticate: (user) => dispatch(authenticate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer) 
