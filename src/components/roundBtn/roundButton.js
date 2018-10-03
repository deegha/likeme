import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import { styles } from './styles'

export const RoundButton = ({callBack, extrenalStyles, opacity, children, disabled}) => {

	const textStyles = disabled?styles.btnTextDisabled:styles.btnText

	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={callBack}
			style={[styles.btnContainer, extrenalStyles]}>
			<Text style={textStyles}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}
