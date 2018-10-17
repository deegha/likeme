import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { ModalComponent } from '../../components'
import { fetchFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import CreatepostContainer from './components/createPost/CreatepostContainer'

import * as BTN_ACTIONS from '../../components/feed/actionsConstants'

import { styles } from './styles'
import { MainView } from './MainView'

class MainContainer extends React.Component {

	static navigationOptions = {
    title: 'Home',
	}


	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}
	}

	componentDidMount() {
		this.props.getFeeds()
	}

	createPost = () => this.setState({showModal: true})

	setModalVisible = (visible) => () => { 
    this.setState({showModal: visible})
	}
	
	setModalVisibleAfterPost = () => this.setState({showModal: false})

	makeAction = (action, postId) => () => {
		
		if(!this.props.auth.authenticated) {

			switch(action) {
				case BTN_ACTIONS.VOTE_UP : 
					this.props.setWatingAction('Post', {
						id: postId,
						action: BTN_ACTIONS.VOTE_UP
					})
				case BTN_ACTIONS.VOTE_DOWN : 
					this.props.setWatingAction('Post', {
						id: postId,
						action: BTN_ACTIONS.VOTE_DOWN
					})
				case BTN_ACTIONS.CLICK_ACTION : 
					this.props.setWatingAction('Post', {
						id: postId,
						action: BTN_ACTIONS.CLICK_ACTION
					})
			}

			this.props.setWatingAction(action)
			this.props.navigation.navigate('login')
		}

	}
	
	render() {
			const {feeds, loading, auth} = this.props

			return (
			<View style={styles.container}>
				{feeds[0].id === null ? <View><Text>loading</Text></View>:
				<MainView 
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

const mapStateToProps = ({feeds, auth}) => ({
	feeds: feeds.feeds,
	loading: feeds.loading,
	auth
})

const mapDispatchToProps = (dispatch) => ({
	getFeeds : () => dispatch(fetchFeeds()),
	setWatingAction: (action, params) => dispatch(setWatingAction(action, params))
})

export default connect(mapStateToProps, mapDispatchToProps) (MainContainer)
