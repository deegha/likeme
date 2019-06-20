import React from 'react'
import { View, Text , Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Image from 'react-native-scalable-image'

import { TextFeild, RoundButton, GooglePlacesInput, Categories } from '../../../../components/'
import { styles } from './styles'
import Tooltip from 'rn-tooltip'

const Tag = ({cat, onPress, selelcted}) => {
	return (
		<TouchableOpacity onPress={onPress(cat)}>
				<Text style={(cat ===selelcted)?styles.selected:styles.tag}>{cat}</Text>
		</TouchableOpacity>
	)
}

export const CreatePost = ({ onTextChange, location,  submitPost, postText, disabled, postMedia, pickImage, takePhoto, setLocationPostLocation, category, setCategory }) => {
	
	return (
		<ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} >
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
								tooltipText="Try to crop your image to make a 4:3 ratio, that will make your post more attractive">
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
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagContainer} >
				<Tag onPress={setCategory} cat={Categories.FOOD_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.CLOTHING_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.HEALTH_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.FASHION_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.RIDES_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.BEAUTY_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.CARDS_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.ONLINE_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.DRINKS_CAT} selelcted={category} />
				<Tag onPress={setCategory} cat={Categories.TRAVEL_CAT} selelcted={category} />
			</ScrollView>
			<View style={styles.form}>
				<TextInput 
					autoFocus
					selectionColor={"#000000"}
					value={postText}
				  onChangeText={onTextChange}
					style={styles.inputFeild}
					underlineColorAndroid="#ffffff"
					multiline={true}
					placeholder="Tell them about your deal"
					/>
					<GooglePlacesInput location={location} callback={setLocationPostLocation} />
			</View>
			<View style={styles.postData}>
				{postMedia.url !== "" && (
					<Image source={{ uri: postMedia.url }} width={Dimensions.get('window').width} />
				)}
			</View>
		</View>
		</ScrollView>
	)
}
