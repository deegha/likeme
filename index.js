import React from 'react'
import { RootStack } from './routerStack'
import  { connect } from 'react-redux'
import Fire from './src/services/firebase'
import { authenticate, logout } from './src/actions/authActions'
import { ToastAndroid } from 'react-native'
import { getUserById, setPushToken } from './src/services/backendClient'
import { Permissions, Notifications } from 'expo'
import { Loading } from './src/components'

console.disableYellowBox = true
class Index extends React.Component {

	state = {
		LoadingContent: false
	}

  componentDidMount() {

		Fire.database().ref("feeds").on("value", (snapshot, b) => {
			console.log("database changed")
		})
		this.setState({LoadingContent: true})
		Fire.auth().onAuthStateChanged(userData => {
			if(userData !== null) { 
				getUserById(userData.uid)
					.then(data => {
						this.props.authenticate(data.val()[userData.uid])
						this.registerForPushNotificationsAsync(userData.uid)
						ToastAndroid.showWithGravity(
							'logged in succes',
							ToastAndroid.SHORT,
							ToastAndroid.BOTTOM
						)

						this.setState({LoadingContent: false})
					})
      }else {
				this.props.logoutUser()
				ToastAndroid.showWithGravity(
					'not logged in',
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				)

				this.setState({LoadingContent: false})
			}
		})
	}
	
	registerForPushNotificationsAsync = async (uid) => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		)
		let finalStatus = existingStatus
	
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
	
		if (finalStatus !== 'granted') {
			return;
		}
	
		let token = await Notifications.getExpoPushTokenAsync()
	
		console.log(token, uid)
		setPushToken({notificationToken: token}, uid)
		.then(re => {
			console.log('token saved')
		})
		.catch(err => {
			console.log(err, "error")
		})
	}

  render() {

		if(this.state.LoadingContent) {
			return <Loading />
		}else{
			return <RootStack />
		}

    
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