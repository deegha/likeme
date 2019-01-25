import React from 'react'
import { View, Text , Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Image from 'react-native-scalable-image'

import { TextFeild, RoundButton, GooglePlacesInput } from '../../../../components/'
import { styles } from './styles'
import Tooltip from 'rn-tooltip'

export const CreatePost = ({ onTextChange, location,  submitPost, postText, disabled, postMedia, pickImage, takePhoto, setLocationPostLocation }) => {
	
	return (
		<ScrollView style={styles.container} >
		<View style={styles.container}>
			<View style={styles.postOptions}>
					<View style={styles.postOptionsSection}>
						<TouchableOpacity style={styles.option} >
						<Tooltip
						onClose={takePhoto}
						backgroundColor={'#7ed6df'}
						width={200} 
						height={100}
						popover={<Text style={{color:'#ffffff'}}>Try to crop your image to make a squre, that will make your post more attractive</Text>}
						tooltipText="Try to crop your image to make a squre, that will make your post more attractive">
							<Text  style={styles.optionText}>camera</Text>
						</Tooltip>
							
						</TouchableOpacity>
						<TouchableOpacity  style={styles.option} >
							<Text style={styles.optionText} onPress={pickImage}>library</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.postOptionsSection}>
						{disabled? (
							<View  style={styles.option}>
								<Text style={styles.optionTextDisabled} >Share</Text>
							</View>
						): (
							<TouchableOpacity  style={styles.option} onPress={submitPost}>
								<Text style={styles.optionText} >Share</Text>
							</TouchableOpacity>
						)}
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
					<GooglePlacesInput location={location} callback={setLocationPostLocation} />

			
			</View>
			
			<View style={styles.postData}>
				
				{postMedia.url !== "" && <Image source={{ uri: postMedia.url }} width={Dimensions.get('window').width} /> }
			</View>
		
		</View>
		</ScrollView>
	)
}
