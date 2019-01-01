import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 

export const styles = StyleSheet.create({
	btnContainer: {
		// backgroundColor: '#ecf0f1',
		height: 20,
		width: 40,
		display:'flex',
		justifyContent:'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 100,
		margin: 8
	},
	btnText: {
		color: shared.secondaryColor
	},
	btnTextDisabled: {
		color: shared.disabledText
	}
})