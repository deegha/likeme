import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Button, Animated, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { ModalComponent } from '../../components'
import { fetchFeeds, voteUpAction } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import CreatepostContainer from './components/createPost/CreatepostContainer'
import Fire from '../../services/firebase'

import * as BTN_ACTIONS from '../../components/feed/actionsConstants'

import { styles } from './styles'
import { MainView } from './MainView'

const HEADER_MAX_HEIGHT = 100
const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class MainContainer extends React.Component {

	static navigationOptions = {
		header: null 
	}

	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			scrollY: new Animated.Value(0)
		}
	}

	componentWillMount() {
    this.props.navigation.setParams({ logOut: this.logOut,auth: this.props.auth.authenticated })
	}
	
	componentWillUpdate(preProps) {
		if(this.props.auth.authenticated !== preProps.auth.authenticated) {
			this.props.navigation.setParams({auth: this.props.auth.authenticated })
		}
	}

	componentDidMount() {
		this.props.getFeeds()
	}

	leftBtn = () => {
		
	}

	logOut = () => Fire.auth().signOut()

	createPost = () => {
		if(!this.props.auth.authenticated) {
			this.props.setWatingAction('Home', {
				id: null,
				action: BTN_ACTIONS.CREATE_POST
			})
			this.props.navigation.navigate('login')
		}else {
			this.setState({showModal: true})
		}
	} 

	setModalVisible = (visible) => () => { 
    this.setState({showModal: visible})
	}
	
	setModalVisibleAfterPost = () => this.setState({showModal: false})

	navigateLogin = () => this.props.navigation.navigate('login')

	makeAction = () => {}
	
	render() {
			const {feeds, loading, auth} = this.props

			const scrollY = Animated.add(
				this.state.scrollY,
				Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
			)
	
			const headerTranslate = scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE],
				outputRange: [0, -60],
				extrapolate: 'clamp',
			})
	
			const titleTranslate = scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE],
				outputRange: [0, 40],
				extrapolate: 'clamp',
			})

			const titleSize =  scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE/2 , HEADER_SCROLL_DISTANCE/1.2,HEADER_SCROLL_DISTANCE],
				outputRange: [40, 38, 35 ,18],
				extrapolate: 'clamp',
			})


			const zIndex =  scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
				outputRange: [0, 0, 1],
				extrapolate: 'clamp',
			})

			const actionFontWeight =  scrollY.interpolate({
				inputRange: [0,HEADER_SCROLL_DISTANCE],
				outputRange: [800, 100],
				extrapolate: 'clamp',
			})

			return (
			<View style={styles.container}>
				{feeds[0].id === null ? <View><Text>loading</Text></View>:
				<MainView 
					actionFontWeight={actionFontWeight}
					titleSize={titleSize}
					zIndex={zIndex}
					headerTranslate={headerTranslate}
					titleTranslate={titleTranslate}
					scrollY={this.state.scrollY}
					auth={auth}
					navigateLogin={this.navigateLogin}
					logOut={this.logOut}
					creating={this.props.creating}
					createPost={this.createPost}
					makeAction={this.makeAction}
					feedsItem={feeds} 
					fetchFeeds={this.props.getFeeds}
					loading={loading}
					navigation={this.props.navigation} 
					setModalVisible={this.setModalVisible} />}

				<ModalComponent visible={this.state.showModal} setModalVisible={this.setModalVisible} >
					<CreatepostContainer setModalVisible={this.setModalVisibleAfterPost}  />
				</ModalComponent>
			</View>
		)
	}
}

const mapStateToProps = ({feeds, auth, waitingAction}) => ({
	feeds: feeds.feeds,
	loading: feeds.loading,
	creating: feeds.creating,
	auth,
	waitingAction: waitingAction.waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	getFeeds : () => dispatch(fetchFeeds()),
	setWatingAction: (action, params) => dispatch(setWatingAction(action, params)),
	voteUp: (feedId) => dispatch(voteUpAction(feedId))
})

export default connect(mapStateToProps, mapDispatchToProps) (MainContainer)
