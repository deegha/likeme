import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { ModalComponent } from '../../components'
import { fetchFeeds } from '../../actions/feedsActions'
import CreatepostContainer from './components/createPost/CreatepostContainer'


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

	setModalVisible = (visible) => () => {
    this.setState({showModal: visible})
	}
	
	setModalVisibleAfterPost = () => this.setState({showModal: false})
	
	render() {
			console.log(this.props.feeds, "feeds on main container")
			return (
			<View >
				<MainView 
					setModalVisible={this.setModalVisible} 
					navigation={this.props.navigation}/>
				<ModalComponent visible={this.state.showModal} setModalVisible={this.setModalVisible} >
					<CreatepostContainer setModalVisible={this.setModalVisibleAfterPost}  />
				</ModalComponent>
			</View>
		)
	}
}

const mapStateToProps = ({feeds}) => ({
	feeds
})

const mapDispatchToProps = (dispatch) => ({
	getFeeds : () => dispatch(fetchFeeds())
})

export default connect(mapStateToProps, mapDispatchToProps) (MainContainer)
