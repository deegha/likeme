import { createStackNavigator } from 'react-navigation'

import MainContainer from "./src/pages/MainPage/MainContainer"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'

export const RootStack = createStackNavigator(
	{
		Home: {
			screen: MainContainer,
			title: 'Home',
			navigationOptions:{
				header: null 
			  }
		},
		login: {
			screen: LoginPageContainer,
			title: 'Login',
		}
	},
	{
		header: null,
		initialRouteName: 'Home',
		navigationOptions: {
		headerStyle: {
			backgroundColor: '#00bcd4',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: '100',
		},
    },
	}
)	

