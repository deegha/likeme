import React from 'react'
import { View, Text , Dimensions, TouchableOpacity } from 'react-native'
import Image from 'react-native-scalable-image'

import { TextFeild, RoundButton } from '../../../../components/'
import { styles } from './styles'

export const CreatePost = ({ onTextChange, submitPost, postText, disabled, postMedia, pickImage, takePhoto }) => {

	return (
		<View style={styles.container}>
			<View style={styles.postOptions}>
				<View style={styles.postOptionBtn}>
					<TouchableOpacity style={styles.option} onPress={takePhoto}>
						<Text  style={styles.optionText}>camera</Text>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.option} disabled={disabled}>
						<Text style={styles.optionText} onPress={pickImage}>library</Text>
					</TouchableOpacity>
					<TouchableOpacity  style={styles.option}>
						<Text style={styles.optionText} onPress={submitPost}>Share</Text>
					</TouchableOpacity>
					{/* <RoundButton callBack={takePhoto}>
						Camera
					</RoundButton>
					<RoundButton callBack={pickImage}>
						Media
					</RoundButton>
					<RoundButton callBack={submitPost} disabled={disabled}>
						Share
					</RoundButton> */}
				</View>
			</View>
			<View>
				<TextFeild 
					placeholder="Title"
					/>
				<TextFeild 
					placeholder="Tell somthing about it..."
					/>
			</View>
			<View style={styles.postData}>
				
				{postMedia.url !== "" && <Image source={{ uri: postMedia.url }} width={Dimensions.get('window').width} /> }
			</View>
		
		</View>
	)
}
