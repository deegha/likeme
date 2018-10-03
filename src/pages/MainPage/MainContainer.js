import React from 'react'
import { View, Text, TouchableHighlight, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { ModalComponent } from '../../components'
import CreatepostContainer from './components/createPost/CreatepostContainer'

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

	setModalVisible = (visible) => () => {
    this.setState({showModal: visible})
	}
	
	setModalVisibleAfterPost = () => this.setState({showModal: false})
	
	render() {
			return (
			<View >
				<View style={{height:10}} />
				<Button
					color={"red"}
          title="create post"
          onPress={ this.setModalVisible(true)}
        />
				<View style={{height:10}} />
				<Button
          title="login"
          onPress={() => this.props.navigation.navigate('login')}
        />
				
				<ModalComponent visible={this.state.showModal} setModalVisible={this.setModalVisible} >
					<CreatepostContainer setModalVisible={this.setModalVisibleAfterPost}  />
				</ModalComponent>
			</View>
		)
	}
}

export default MainContainer
