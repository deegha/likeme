import React from 'react'

import {View, Text, TouchableOpacity, Image } from 'react-native'
import { TextFeild, RoundBtn } from '../../components'

import { styles } from '../loginPage/styles'
import { regStyles } from './styles'

export const RegisterView = ({pickImage, formError, onChange, onSubmit, data}) => {

  return (
    <View style={styles.container}>
	
		<View style={styles.loginTitileContainer}>
			<TouchableOpacity onPress={pickImage} style={regStyles.addImageContainer}>
        {data.propic !== ""?<Image source={{ uri: data.propic }} style={regStyles.proPic} />  :<Text style={regStyles.addImageText} >Add Image</Text>}
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
				onChange={onChange} 
        feild="name"  
				placeholder="Name" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				onChange={onChange} 
				type="email"
				feild="email"  
				placeholder="Email" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				onChange={onChange}
				type="password"
				feild="password"  
				placeholder="Password" />
		</View>
    <View style={styles.innerContainer}>
			<TextFeild 
				onChange={onChange}
				type="password"
				feild="confirmPassword"  
				placeholder="Confirm Password"/>
		</View>
		<View style={styles.btnContainer}>
			<RoundBtn loading={data.creating} onPress={ onSubmit} color={'#000000'}>
				Register
			</RoundBtn>
		</View>		
	</View>
  )
}