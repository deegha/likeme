import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 

export const styles = StyleSheet.create({
	btnContainer: {
		backgroundColor: shared.primaryColor,
		height: 70,
		width: 70,
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