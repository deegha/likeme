import { createStackNavigator } from 'react-navigation'

import MainContainer from "./src/pages/MainPage/MainContainer"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'
import RegisterContainer from './src/pages/registerPage/RegisterContainer'

import  * as shared from './src/components/sharedStyles'

export const RootStack = createStackNavigator(
	{
		Home: {
			screen: MainContainer,
			title: 'Like me',
		},
		login: {
			screen: LoginPageContainer,
			title: 'Login',
		},
		register: {
			screen: RegisterContainer,
			title: 'Register',
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

