/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { connect } from 'react-redux'
import { Animated,View } from 'react-native'
import { Permissions, Location } from 'expo'
import { fetchFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import { FeedsView } from '../../components'
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
      showModal:false
		}
	}

  logout = () => Fire.auth().signOut()

  async componentDidMount() {
    try{
      const userGeo = await this.getLocationAsync()
      // this.props.getFeeds('w2833r')
      this.props.getFeeds(userGeo.userGeo, userGeo.neighboursArr)
    }catch(err){
      console.log(err)
    }
  }

  async componentDidUpdate(preProps) {
    
    if(preProps.auth.authenticated !== this.props.auth.authenticated) {
      const userGeo = await this.getLocationAsync()
      this.props.getFeeds(userGeo.userGeo, userGeo.neighboursArr)
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
    console.log(location)
		const userGeo = Geohash.encode(location.coords.latitude, location.coords.longitude, 6)
    const neighboursObj = Geohash.neighbours(userGeo)
    
    
		const neighboursArr = Object.keys(neighboursObj).map(n =>  neighboursObj[n]) 
 
		this.setState({ userGeo, neighboursArr })
		return Promise.resolve({userGeo: userGeo, neighboursArr})
  }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  }

  navigateTol = () => {
    this.props.navigation.navigate("login")
  }

  setModalVisible = (visible) => () => { 
    this.setState({showModal: visible})
  }

  createPost = () => {
    if(!this.props.auth.authenticated) {
			this.props.navigation.navigate('login', {page: 'tabs',action: 'create_post'})
    }else {
      this.setState({showModal: true})
    }
    
  }
  
  setModalVisibleAfterPost = () => this.setState({showModal: false})

  render() {
    const { scrollOffset, showModal, userGeo } = this.state
    const { feeds , auth} = this.props
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
        <FeedsView 
          titleMarginTop={titleMarginTop}
          subTitleMarginTop={subTitleMarginTop}
          titleFontSize={titleFontSize}
          feedsItem={feeds} 
          auth={auth}
          
          userGeo={userGeo}
          createPost={this.createPost}
          navigation={this.props.navigation}
          showModal={showModal}
          setModalVisibleAfterPost={this.setModalVisibleAfterPost}
          setModalVisible={this.setModalVisible}
          logout={this.logout}
          navigateTol={this.navigateTol}
          handleScroll={this.handleScroll}
        />
    ) 
  }
}

const mapStateToProps = ({feeds, auth, waitingAction, allFeeds:{creating}}) => ({
	feeds: feeds.feeds,
	loading: feeds.loading,
	creating,
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
