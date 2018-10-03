import React from 'react'
import { View, Text } from 'react-native'
import { Dimensions } from 'react-native'
import Image from 'react-native-scalable-image'

import { TextFeild, RoundButton } from '../../../../components/'
import { styles } from './styles'

export const CreatePost = ({ onTextChange, submitPost, postText, disabled, postMedia, pickImage, takePhoto }) => {

	return (
		<View style={styles.container}>
			<View style={styles.postData}>
				<TextFeild
					value={postText}
					onChange={onTextChange}
					multiline={true}
					externalStyles={styles.inputFeild}
					placeholder={"Share something cool..."}
					underlineColorAndroid={"#ffff"}/>
				
          			{postMedia.url !== "" && <Image source={{ uri: postMedia.url }} width={Dimensions.get('window').width} /> }
			</View>
			<View style={styles.postOptions}>
				<View style={styles.postOptionBtn}>
					<RoundButton callBack={takePhoto}>
						Camera
					</RoundButton>
					<RoundButton callBack={pickImage}>
						Media
					</RoundButton>
					<RoundButton callBack={submitPost} disabled={disabled}>
						Share
					</RoundButton>
				</View>
			</View>
		</View>
	)
}
