import React from 'react'
import { RootStack } from './routerStack'
import  { connect } from 'react-redux'
import Fire from './src/services/firebase'
import { authenticate, logout, authenticateRequest } from './src/actions/authActions'
import { fetchAllFeedsRequestSuccess } from './src/actions/feedsActions'
import { ToastAndroid, Image, View, AsyncStorage } from 'react-native'
import { getUserById, setPushToken } from './src/services/backendClient'
import { Permissions, Notifications } from 'expo'

import splash from './assets/splash.png'

console.disableYellowBox = true
class Index extends React.Component {

	state = {
		LoadingContent: false
	}

  async componentDidMount() {


		// const feeds = await AsyncStorage.getItem('feeds')
		// if(feeds) {
		// 	this.props.setInitialFeeds(JSON.parse(feeds))
		// }

		this.setState({LoadingContent: true})

		this.props.setLoading()
		Fire.auth().onAuthStateChanged(userData => {
			if(userData !== null) { 
				getUserById(userData.uid)
					.then(data => {

						// console.log(data, "data at index")

						try{
							this.props.authenticate(data.val()[userData.uid])
							console.log("2")
							this.registerForPushNotificationsAsync(userData.uid)
							console.log("3")
							ToastAndroid.showWithGravity(
								'logged in succes',
								ToastAndroid.SHORT,
								ToastAndroid.BOTTOM
							)
							console.log("4")
							this.setState({LoadingContent: false})
						}catch(err) {
							console.log("5")
							console.log(err)
							this.props.logoutUser()
							this.setState({LoadingContent: false})
						}
						
						console.log("LoadingContent", LoadingContent)
						
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
		// console.log(this.state.LoadingContent)
		// if(this.state.LoadingContent) {
		// 	return (
		// 		<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
		// 			<Image source={splash} style={{width: 400, height:400}} />
		// 		</View>
		// 	)
		// }else{
			return <RootStack />
		// }
  }
}

const mapStateToProps = ({auth, waitingAction}) => ({
	auth,
	waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	authenticate: (user) => dispatch(authenticate(user)),
	logoutUser: () => dispatch(logout()),
	setInitialFeeds: (feeds) => dispatch(fetchAllFeedsRequestSuccess(feeds)),
	setLoading: () => dispatch(authenticateRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)