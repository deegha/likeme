import React from 'react'

import {View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import { TextFeild, RoundBtn } from '../../components'

import { styles } from '../loginPage/styles'
import { regStyles } from './styles'

export const RegisterView = ({
	pickImage, formError, onChange, onSubmit, data, imageMargin, imageWidth,imageText,validForm
}) => {
	console.log(validForm, 'validForm')
  return (
    <View style={styles.container}>
	
		<View style={styles.loginTitileContainer}>
			<TouchableOpacity onPress={pickImage} >
				<Animated.View style={[
				regStyles.addImageContainer,
				{marginTop: imageMargin, 
					marginBottom: imageMargin, 
					width: imageWidth, 
					height: imageWidth}
			]}>
        {data.propic !== ""?<Image source={{ uri: data.propic }} style={regStyles.proPic} />  :<Animated.Text style={[regStyles.addImageText, {fontSize:imageText}]} >Add Image</Animated.Text>}
				</Animated.View>
			</TouchableOpacity>
		</View>
		<View style={styles.loginTitileContainer}>
			{formError !== "" && 	
			<Text style={styles.formError}>
					{formError}
			</Text>}
		</View>
    <View style={styles.innerContainer}>
			<TextFeild 
				name="Name"
				onChange={onChange} 
        feild="name"  
				placeholder="Name" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				name="Email"
				onChange={onChange} 
				type="email"
				feild="email"  
				placeholder="Email" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				name="Password"
				onChange={onChange}
				type="password"
				feild="password"  
				placeholder="Password" />
		</View>
    <View style={styles.innerContainer}>
			<TextFeild 
				name="Confirm Password"
				onChange={onChange}
				type="password"
				feild="confirmPassword"  
				placeholder="Confirm Password"/>
		</View>
		<View style={styles.btnContainer}>
			<RoundBtn disabled={!validForm} loading={data.creating} onPress={ onSubmit} color={'#34495e'}>
				Signup
			</RoundBtn>
		</View>		
	</View>
  )
}