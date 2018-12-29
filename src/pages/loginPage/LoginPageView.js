import React from "react"
import { View, Button, ActivityIndicator,Animated, Text } from 'react-native'

import { TextFeild, RoundBtn } from '../../components'
import { styles } from './styles' 
import {primaryColor, thirdColor} from '../../components/sharedStyles'

export const LoginPageView = ({
	loading, 
	onSubmit, 
	formError, 
	contiueWithFacebook, 
	navigateRegister,
	onChange,
	titleMargin,
	titleSize,
	deviderHeight,
	validForm
}) => (
	<View style={styles.container}>

		<Animated.View style={[styles.loginTitileContainer, {
			 marginBottom:titleMargin,
			 marginTop: titleMargin,
		}]}>
			<Animated.Text style={[styles.loginTitile, {
				fontSize: titleSize,
			}]}>
				Black App
			</Animated.Text>
		</Animated.View>
		<View style={[styles.innerContainer]}>
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
			<RoundBtn loading={loading} onPress={ onSubmit} disabled={!validForm} fontColor={"#ffffff"} color={'#34495e'}>
				Login
			</RoundBtn>
		</View>
		<Animated.View style={[styles.deviderContainer, {height: deviderHeight}]}>
			
			<View style={styles.devider}></View>
				<Text  style={styles.text}>
					OR
				</Text>
			<View style={styles.devider}></View>
		
		</Animated.View>
		<View style={styles.btnContainer}>
			<RoundBtn onPress={navigateRegister} color={'#00bcd4'}>
				Sign up
			</RoundBtn>
		</View>
		<View style={styles.btnContainer} >
			<RoundBtn  color={'#3B5998'} onPress={contiueWithFacebook}>
			Continue with facebook
			</RoundBtn>
		</View>
		
	</View>
)