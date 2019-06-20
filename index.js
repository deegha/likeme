import React from 'react'
import { RootStack } from './routerStack'
import  { connect } from 'react-redux'
import Fire from './src/services/firebase'
import { authenticate, logout, authenticateRequest } from './src/actions/authActions'
import { fetchAllFeedsRequestSuccess } from './src/actions/feedsActions'
import { ToastAndroid, Image, View, AsyncStorage } from 'react-native'
import { getUserById, setPushToken } from './src/services/backendClient'
import { Permissions, Notifications } from 'expo'
import { Font } from 'expo'
import splash from './assets/splash.png'

console.disableYellowBox = true
class Index extends React.Component {

	state = {
		LoadingContent: false,
		fontsLoaded: false
	}

  async componentDidMount() {


		this.setState({LoadingContent: true})

		await Font.loadAsync({
      'inter black': require('./assets/fonts/Inter-Black.ttf'),
      'inter bold': require('./assets/fonts/Inter-Bold.ttf'),
      'inter regular': require('./assets/fonts/Inter-Regular.ttf'),
			'inter thin': require('./assets/fonts/Inter-ExtraLight-BETA.ttf'),
			'saira black': require('./assets/fonts/SairaExtraCondensed-Black.ttf'),
			'saira bold': require('./assets/fonts/SairaExtraCondensed-Bold.ttf'),
			'saira light': require('./assets/fonts/SairaExtraCondensed-Light.ttf'),
			'saira thin': require('./assets/fonts/SairaExtraCondensed-Thin.ttf'),
    })
		this.setState({fontsLoaded: true})
		

		this.props.setLoading()
		Fire.auth().onAuthStateChanged(userData => {
			if(userData !== null) { 
				getUserById(userData.uid)
					.then(data => {

						try{
							this.props.authenticate(data.val()[userData.uid])
						
							this.registerForPushNotificationsAsync(userData.uid)
						
							ToastAndroid.showWithGravity(
								'logged in succes',
								ToastAndroid.SHORT,
								ToastAndroid.BOTTOM
							)
						
							this.setState({LoadingContent: false})
						}catch(err) {
				
							console.log(err)
							this.props.logoutUser()
							this.setState({LoadingContent: false})
						}
						
						
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
		if(this.state.fontsLoaded) {
			return <RootStack />
		}else{
			return null
		}
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