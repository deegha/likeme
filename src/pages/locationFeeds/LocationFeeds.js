/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { connect } from 'react-redux'
import { Animated } from 'react-native'
import { Permissions, Location } from 'expo'
import { fetchFeeds } from '../../actions/feedsActions'
import { LocationFeedsView } from './LocationFeedsView'
import Fire from '../../services/firebase'
import Geohash from 'latlon-geohash'

class LocationFeeds extends React.Component {

  static navigationOptions = {
		header: null 
	}

	constructor(props) {
		super(props)
		this.state = {
			scrollOffset: new Animated.Value(0),
			userGeo: '',
			neighboursArr: [],
		}
	}

  logout = () => Fire.auth().signOut()

  async componentDidMount() {
    console.log( this.props.navigation.getParam('data') )

    try{
      const userGeo = await this.getLocationAsync()
      this.props.getFeeds('w2833r')
    }catch(err){
      console.log(err)
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

		let location = await Location.getCurrentPositionAsync({})
		const userGeo = Geohash.encode(location.coords.latitude, location.coords.longitude, 6)
		const neighboursObj = Geohash.neighbours(userGeo)
		const neighboursArr = Object.keys(neighboursObj).map(n =>  neighboursObj[n]) 

		this.setState({ userGeo, neighboursArr })
		return Promise.resolve({userGeo: userGeo})
  }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  }

  navigateTol = () => {
    console.log('cliked')
    this.props.navigation.navigate("login")
  }

  render() {
    const { scrollOffset } = this.state
    const { feeds, tournaments, auth} = this.props

    const titleMarginTop = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [45, 20],
      extrapolate: 'clamp',
    })
    const subTitleMarginTop = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [37, 0],
      extrapolate: 'clamp',
    })
    const titleFontSize = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [30, 18],
      extrapolate: 'clamp',
    })

    return (
      <LocationFeedsView 
        titleMarginTop={titleMarginTop}
        subTitleMarginTop={subTitleMarginTop}
        titleFontSize={titleFontSize}
        feedsItem={feeds} 
        auth={auth}
        
        logout={this.logout}
        navigateTol={this.navigateTol}
        handleScroll={this.handleScroll}
      />
    ) 
  }
}

const mapStateToProps = ({feeds, auth, waitingAction}) => ({
	feeds: feeds.feeds,
	loading: feeds.loading,
	creating: feeds.creating,
	auth,
	waitingAction: waitingAction.waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	getFeeds : (userGeo, neighboursArr) => dispatch(fetchFeeds(userGeo, neighboursArr)),
	getAllFeeds: () => dispatch(fetchAllFeeds()),
	setWatingAction: (action, params) => dispatch(setWatingAction(action, params)),
	voteUp: (feedId) => dispatch(voteUpAction(feedId))
})

export default connect (mapStateToProps, mapDispatchToProps)(LocationFeeds)
