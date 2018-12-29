import React from 'react'
import { connect } from 'react-redux'
import { View,  Animated} from 'react-native'


import { ModalComponent } from '../../components'
import { fetchFeeds, voteUpAction, fetchAllFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import CreatepostContainer from './components/createPost/CreatepostContainer'
import Fire from '../../services/firebase'


import * as BTN_ACTIONS from '../../components/feed/actionsConstants'

import { styles } from './styles'
import  MainView  from './MainView'

class MainContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			scrollY: new Animated.Value(0),
			userGeo: '',
			neighboursArr: [],
			selected:'home'
		}
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

	render() {
		const { auth, navigation, creating  } = this.props

		return (
			<View style={styles.container}>
				<MainView setModalVisible={this.setModalVisible} />
				<ModalComponent 
					visible={this.state.showModal} 
					setModalVisible={this.setModalVisible} >
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
	getFeeds : (userGeo, neighboursArr) => dispatch(fetchFeeds(userGeo, neighboursArr)),
	getAllFeeds: () => dispatch(fetchAllFeeds()),
	setWatingAction: (action, params) => dispatch(setWatingAction(action, params)),
	voteUp: (feedId) => dispatch(voteUpAction(feedId))
})

export default connect(mapStateToProps, mapDispatchToProps) (MainContainer)
