import { createStackNavigator } from 'react-navigation'

// import Tabs from "./src/pages/MainPage/MainView"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'
import RegisterContainer from './src/pages/registerPage/RegisterContainer'
import SettingsContainer from './src/pages/Settings/SettingsContainer'
import LocationFeeds from './src/pages/locationFeeds/LocationFeeds'
import AllFeeds  from './src/pages/allFeeds/AllFeeds'
import Profile from './src/pages/profile/ActivaUserFeeds'
import HomeContainer from './src/pages/home/home'
import  * as shared from './src/components/sharedStyles'

export const RootStack = createStackNavigator(
	{
		// tabs: {
		// 	screen: Tabs,
		// 	navigationOptions:{
		// 		header: null 
		// 	}
		// },	
		profile: {
			screen: Profile,
			navigationOptions:{
				header: null 
			}
		},
		allFeeds: {
			screen: AllFeeds,
			navigationOptions:{
				header: null 
			}
		},	
		home: {
			screen: HomeContainer,
			navigationOptions:{
				header: null 
			}
		},	
		settings: {
			screen: SettingsContainer,
		},	
		login: {
			screen: LoginPageContainer,
			title: 'Login',
			navigationOptions:{
				header: null 
			}
		},
		LocationFeeds: {
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
		initialRouteName: 'home',
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

