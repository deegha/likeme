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
			formError: ""
		}
	} 

	static navigationOptions = {
		header: null 
	}

	onChangeEmail = (text) =>  { 
		text === "" ? this.setFormError(EMAIL_NOT_EMPTY): this.setFormError("")
		this.setState({email: text})
	}

	onChangePassword = (text) =>  { 
		text === "" ? this.setFormError(PASS_NOT_EMPTY): this.setFormError("")
		this.setState({password: text})
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
		const { waitingAction, params } = this.props.waitingAction
				
		if(waitingAction !== "")
			this.props.navigation.navigate(waitingAction, params)
		
		this.props.navigation.navigate('Home')
	}

	onSubmit = ()  => {
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
				user !== undefined && this.setFormError("")
				
				this.redirect()
			})
			.catch(err => {

				this.setFormError(err.message)
				console.log(err)
			})
	}

  render() { 
		const { userName,  password, validEmail, validPass, formError} = this.state
		return <LoginPageView 
							contiueWithFacebook={this.contiueWithFacebook}
							onChangeEmail={this.onChangeEmail} 
							onChangePassword={this.onChangePassword}
							onSubmit={this.onSubmit}
							userName={userName} 
							formError={formError}
							password={password}/>
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
