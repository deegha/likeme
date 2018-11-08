import React from "react"
import { View, Button, ActivityIndicator, Text } from 'react-native'

import { TextFeild, RoundBtn } from '../../components'
import { styles } from './styles' 
import {primaryColor, thirdColor} from '../../components/sharedStyles'

export const LoginPageView = ({onChangeEmail, userName, password, onChangePassword, onSubmit, formError, contiueWithFacebook}) => (
	<View style={styles.container}>
	
		<View style={styles.loginTitileContainer}>
			<Text style={styles.loginTitile}>
				Like  me
			</Text>
		</View>
		<View style={styles.loginTitileContainer}>
			{formError !== "" && 	
			<Text style={styles.formError}>
					{formError}
			</Text>}
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				autoCapitalize="none"
				keyboardType='email-address' 
				returnKeyType="next"
				autoCorrect={false}
				onChange={onChangeEmail} 
				feild="email"  
				placeholder="Email" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				returnKeyType="go" 
				onChange={onChangePassword}
				feild="password" 
				placeholder="Password" 
				secureTextEntry/>
		</View>
		<View style={styles.btnContainer}>
			<RoundBtn onPress={ onSubmit} color={'#00bcd4'}>
				Login
			</RoundBtn>
		</View>
		<View style={styles.deviderContainer}>
			
			<View style={styles.devider}></View>
				<Text  style={styles.text}>
					OR
				</Text>
			<View style={styles.devider}></View>
		
		</View>
		<View style={styles.btnContainer}>
			<RoundBtn onPress={() => console.log("Register new account")} color={'#e74c3c'}>
				Register new account
			</RoundBtn>
		</View>
		<View style={styles.btnContainer} >
			<RoundBtn color={'#3B5998'} onPress={contiueWithFacebook}>
			Continue with facebook
			</RoundBtn>
		</View>
		
	</View>
)