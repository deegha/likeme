import React from 'react'
import { connect } from 'react-redux'
import { ToastAndroid } from 'react-native'

import { LoginPageView } from './LoginPageView'
import Fire from '../../services/firebase'
import { USER_NOT_FOUND, PASS_NOT_EMPTY, EMAIL_NOT_EMPTY, EMAIL_PASS_EMPTY } from '../../services/errorConstants'
import { authenticate } from '../../actions/authActions'

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

	onChangeEmail = (text) =>  { 
		text === "" ? this.setFormError(EMAIL_NOT_EMPTY): this.setFormError("")
		this.setState({email: text})
	}

	onChangePassword = (text) =>  { 
		text === "" ? this.setFormError(PASS_NOT_EMPTY): this.setFormError("")
		this.setState({password: text})
	}

	setFormError = (message) => this.setState({formError : message})

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

				const authUser = {
					id: user.user.uid,
					name : user.user.providerData[0].displayName,
					email: user.user.providerData[0].email, 
				}
				this.props.authenticate(authUser)
			
				ToastAndroid.showWithGravity(
					'login succes',
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				)

				this.props.navigation.navigate('Home')
			})
			.catch(err => {

				this.setFormError(err.message)
				console.log(err)
			})
	}

  render() {
		console.log(this.props.auth, "auth")
		const { userName,  password, validEmail, validPass, formError} = this.state
		return <LoginPageView 
							onChangeEmail={this.onChangeEmail} 
							onChangePassword={this.onChangePassword}
							onSubmit={this.onSubmit}
							userName={userName} 
							formError={formError}
							password={password}/>
	}
}

const mapStateToProps = ({auth}) => ({
	auth
})

const mapDispatchToProps = (dispatch) => ({
	authenticate: (user) => dispatch(authenticate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer) 
