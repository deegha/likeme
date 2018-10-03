import React from 'react'
import { TextInput } from 'react-native'

import { styles } from './styles'


export const TextFeild = ({
					value, 
					onChange, 
					placeholder, 
					underlineColorAndroid,
					feild,
					multiline,
					externalStyles}) => {

						const s = externalStyles?[externalStyles,styles.inputText]:styles.inputText

						return <TextInput
						style={s}
						multiline={multiline}
						placeholder={placeholder}
						onChangeText={onChange}
						underlineColorAndroid= {underlineColorAndroid?underlineColorAndroid:"#00bcd4"}
						value={value} />
					}