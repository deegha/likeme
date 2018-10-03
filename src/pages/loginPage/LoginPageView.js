import React from "react"
import { View, Button, ActivityIndicator, Text } from 'react-native'

import { TextFeild } from '../../components/inputs'
import { styles } from './styles' 
import {primaryColor, thirdColor} from '../../components/sharedStyles'

export const LoginPageView = ({onChangeEmail, userName, password, onChangePassword, onSubmit, formError}) => (
	<View style={styles.container}>
	
		<View style={styles.loginTitileContainer}>
			<Text style={styles.loginTitile}>
				Login to continue 
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
			<Button
					color={primaryColor}
          title="Login"
          onPress={onSubmit}
        />
		</View>
		<View style={styles.deviderContainer}>
			
			<View style={styles.devider}></View>
				<Text  style={styles.text}>
					OR
				</Text>
			<View style={styles.devider}></View>
		
		</View>
		<View style={styles.btnContainer}>
			<Button
					color={thirdColor}
          title="Register new account"
          onPress={() => console.log("login with fb")}
        />
		</View>
		<View style={styles.btnContainer}>
			<Button
          title="Continue with facebook"
          onPress={() => console.log("login with fb")}
        />
		</View>
		
	</View>
)