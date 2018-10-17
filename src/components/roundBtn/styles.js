import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 

export const styles = StyleSheet.create({
	btnContainer: {
		backgroundColor: '#ecf0f1',
		height: 40,
		width: 40,
		display:'flex',
		justifyContent:'center',
		alignItems: 'center',
		borderRadius: 100,
		margin: 10
	},
	btnText: {
		color: shared.secondaryColor
	},
	btnTextDisabled: {
		color: shared.disabledText
	}
})