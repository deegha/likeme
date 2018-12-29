import React from 'react'
import { Text, TouchableHighlight, View, Alert} from 'react-native'
import Modal from "react-native-modal"

import { style, styles } from './styles'

export class ModalComponent extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			visible: false
		}
	}

	setVisibility = (visible) => () => this.setState({visible})

	render() {
		return (
			<View style={{padding:0}}>
				 <Modal 
						style={{padding:0, margin:0}}
						isVisible={this.props.visible}
						swipeDirection={"down"} 
						onSwipeThreshold={0}
						hideModalContentWhileAnimating={true}
						onSwipe={() => this.setState({ visible: false })}
						>
						<View style={styles.container}>
							<View style={styles.modalHeader}>
								<TouchableHighlight
									onPress={this.props.setModalVisible(false)}>
									<Text style={styles.goback}>Go back</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.modalBody}>
								{this.props.children}
							</View>
						</View>
				</Modal>
			</View>
		)
	}
}
