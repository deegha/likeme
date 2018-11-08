import React from "react"
import { View, Button, ActivityIndicator, Text } from 'react-native'

import { TextFeild, RoundBtn } from '../../components'
import { styles } from './styles' 
import {primaryColor, thirdColor} from '../../components/sharedStyles'

export const LoginPageView = ({loading , onSubmit, formError, contiueWithFacebook, navigateRegister, onChange}) => (
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
				onChange={onChange} 
				feild="email"  
				type="email"
				placeholder="Email" />
		</View>
		<View style={styles.innerContainer}>
			<TextFeild 
				type="password"
				onChange={onChange}
				feild="password" 
				placeholder="Password"/>
		</View>
		<View style={styles.btnContainer}>
			<RoundBtn onPress={ onSubmit} color={'#000000'}>
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
			<RoundBtn onPress={navigateRegister} color={'#00bcd4'}>
				Register new account
			</RoundBtn>
		</View>
		<View style={styles.btnContainer} >
			<RoundBtn loading={loading} color={'#3B5998'} onPress={contiueWithFacebook}>
			Continue with facebook
			</RoundBtn>
		</View>
		
	</View>
)