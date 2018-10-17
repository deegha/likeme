import { createStackNavigator } from 'react-navigation'

import MainContainer from "./src/pages/MainPage/MainContainer"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'

import  * as shared from './src/components/sharedStyles'

export const RootStack = createStackNavigator(
	{
		Home: {
			screen: MainContainer,
			title: 'Home',
			// navigationOptions:{
			// 	header: null 
			// }
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
			backgroundColor: shared.backGround,
			borderColor: shared.backGround,
			elevation: 0,
		},
		headerTintColor: '#000',
		headerTitleStyle: {
			fontWeight: '100',
		},
    },
	}
)	

