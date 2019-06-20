import { createStackNavigator } from 'react-navigation'

// import Tabs from "./src/pages/MainPage/MainView"
import LoginPageContainer from './src/pages/loginPage/LoginPageContainer'
import RegisterContainer from './src/pages/registerPage/RegisterContainer'
import SettingsContainer from './src/pages/Settings/SettingsContainer'
import LocationFeeds from './src/pages/locationFeeds/LocationFeeds'
import AllFeeds  from './src/pages/allFeeds/AllFeeds'
import Profile from './src/pages/profile/ActivaUserFeeds'
import HomeContainer from './src/pages/home/home'
import ChangeProfileicture from './src/pages/Settings/changeProfilePicture'
import  * as shared from './src/components/sharedStyles'
import PrivacyPolicy from './src/pages/privacuPolicy/privacyPolicyView'

export const RootStack = createStackNavigator(
	{	
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
			navigationOptions:{
				title: 'Signup'
			}
		},
		profile: {
			screen: Profile,
			navigationOptions:{
				title: 'Profile'
			}
		},
		privacypolicy: {
			screen: PrivacyPolicy,
			navigationOptions:{
				title: 'Privacy Policy'
			}
		},
		changeProPic: {
			screen: ChangeProfileicture
		}
	},
	{
		initialRouteName: 'home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: shared.floatingBtnColor,
				// borderColor: shared.backGround,
				elevation: 5,
				fontFamily: 'saira light'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: '100',
				fontFamily: 'saira light',
				fontSize: 25,
    		letterSpacing: 1.2
			},
    },
	}
)	

