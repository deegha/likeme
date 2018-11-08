import React from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'
import Expo from 'expo'
import * as firebase from 'firebase'

import { LoginPageView } from './LoginPageView'
import Fire from '../../services/firebase'
import { USER_NOT_FOUND, PASS_NOT_EMPTY, EMAIL_NOT_EMPTY, EMAIL_PASS_EMPTY } from '../../services/errorConstants'
import { authenticate } from '../../actions/authActions'
import { getUserById, createUser } from '../../services/backendClient'
import { UserModel } from '../../dataModels/user'
class LoginPageContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			email: "",
			password: "",
			validEmail: "",
			validPass:"",
			formError: "",
			loading: false
		}
	} 
	static navigationOptions = {
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#fff'
  }

	navigateRegister = ()  => {
		this.props.navigation.navigate('register')
	}			

	onChange = (feild, value) => this.setState(
    {[feild]: value, setFormError: ""}
  )

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
		const { waitingAction, params } = this.props.waitingAction
				
		if(waitingAction !== "")
			this.props.navigation.navigate(waitingAction, params)
		
		this.props.navigation.navigate('Home')
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
				console.log(user)
				if(user !== undefined) {
					this.setFormError("")
					this.redirect()
				} 

				this.setState({loading: false})
				
			})
			.catch(err => {

				this.setFormError(err.message)
				console.log(err)
			})
	}

  render() { 
		const { formError } = this.state
		return <LoginPageView 
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
