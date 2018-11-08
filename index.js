import React from 'react'
import { RootStack } from './routerStack'
import  { connect } from 'react-redux'
import Fire from './src/services/firebase'
import { authenticate, logout } from './src/actions/authActions'
import { ToastAndroid } from 'react-native'
import { getUserById } from './src/services/backendClient'

class Index extends React.Component {

  componentDidMount() {
		Fire.auth().onAuthStateChanged(userData => {
			if(userData !== null) { 
				getUserById(userData.uid)
					.then(data => {

						
						console.log(data.val()[userData.uid], "data")
						
						this.props.authenticate(data.val()[userData.uid])
					
						ToastAndroid.showWithGravity(
							'login succes',
							ToastAndroid.SHORT,
							ToastAndroid.CENTER
						)
					})
      }else {
				this.props.logoutUser()
				ToastAndroid.showWithGravity(
					'logout succes',
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				)
			}
		})
  }

  render() {
		console.log(this.props.auth)
    return <RootStack />
  }
}

const mapStateToProps = ({auth, waitingAction}) => ({
	auth,
	waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	authenticate: (user) => dispatch(authenticate(user)),
	logoutUser: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)