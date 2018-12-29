import { createStackNavigator } from 'react-navigation'

import Tabs from "./src/pages/MainPage/MainView"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'
import RegisterContainer from './src/pages/registerPage/RegisterContainer'

import LocationFeeds from './src/pages/locationFeeds/LocationFeeds'

import  * as shared from './src/components/sharedStyles'

export const RootStack = createStackNavigator(
	{
		tabs: {
			screen: Tabs,
			navigationOptions:{
				header: null 
			}
		},	
		login: {
			screen: LoginPageContainer,
			title: 'Login',
		},
		Home: {
			screen: LocationFeeds,
			title: 'Like me',
			navigationOptions:{
				header: null 
			}
		},
		register: {
			screen: RegisterContainer,
			title: 'Register',
		}
	},
	{
		header: null,
		initialRouteName: 'tabs',
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

