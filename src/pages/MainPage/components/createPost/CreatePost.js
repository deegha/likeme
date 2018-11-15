import React from 'react'
import { View, Text , Dimensions, TouchableOpacity, TextInput } from 'react-native'
import Image from 'react-native-scalable-image'

import { TextFeild, RoundButton, GooglePlacesInput } from '../../../../components/'
import { styles } from './styles'

export const CreatePost = ({ onTextChange, submitPost, postText, disabled, postMedia, pickImage, takePhoto }) => {
	
	return (
		<View style={styles.container}>
			<View style={styles.postOptions}>
					<View style={styles.postOptionsSection}>
						<TouchableOpacity style={styles.option} onPress={takePhoto}>
							<Text  style={styles.optionText}>camera</Text>
						</TouchableOpacity>
						<TouchableOpacity  style={styles.option} >
							<Text style={styles.optionText} onPress={pickImage}>library</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.postOptionsSection}>
						<TouchableOpacity  style={styles.option}>
							<Text style={styles.optionText} onPress={submitPost}>Share</Text>
						</TouchableOpacity>
					</View>
				
			</View>
			<View style={styles.form}>
				<TextInput 
					autoFocus
					selectionColor={"#000000"}
				  onChangeText={onTextChange}
					style={styles.inputFeild}
					underlineColorAndroid="#ffffff"
					multiline={true}
					placeholder="Tell them about your deal"
					/>
	
			</View>
			<GooglePlacesInput />
			<View style={styles.postData}>
				
				{postMedia.url !== "" && <Image source={{ uri: postMedia.url }} width={Dimensions.get('window').width} /> }
			</View>
		
		</View>
	)
}
