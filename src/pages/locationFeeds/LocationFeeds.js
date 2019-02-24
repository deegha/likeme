/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { connect } from 'react-redux'
import { Animated,View, Alert, Text } from 'react-native'
import { Permissions, Location } from 'expo'
import { fetchFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import { FeedsView } from '../../components'
import Fire from '../../services/firebase'
import Geohash from 'latlon-geohash'

class LocationFeeds extends React.Component {

  // static navigationOptions = {
	// 	header: null 
	// }

	constructor(props) {
		super(props)
		this.state = {
			userGeo: '',
      neighboursArr: [],
      showModal:false,
		}
	}

  logout = () => Fire.auth().signOut()

  async componentDidMount() {
    this.fetchFeeds()
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.fetchFeeds()
      }
    )
  }

  async componentDidUpdate(preProps) {
    
    if(preProps.auth.authenticated !== this.props.auth.authenticated) {
      this.fetchFeeds()
    }
  }

  fetchFeeds = async () => {
    try{
      const userGeo = await this.getLocationAsync()
      this.props.getFeeds(userGeo.userGeo, userGeo.neighboursArr)
    }catch(err){
      console.log(err, "fetch feeds error on location feeds")
    }
  }

  getLocationPermission = async () =>  {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {

      Alert.alert(
        'Location permisions',
        'This page requires location to work properly, would you like to grant',
        [
          {text: 'Cancel', onPress: () => this.props.navigation.navigate('Hot'), style: 'cancel'},
          {text: 'OK', onPress: () => this.getLocationPermission},
        ],
        { cancelable: false }
      )
    }

    return  status
  }


  getLocationAsync = async () => {
    
    await this.getLocationPermission()
    let location = await Location.getCurrentPositionAsync({})
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

  goback = () => {
    this.props.navigation.goBack()
  }

  navigateToProfile=()=> {
    this.props.navigation.navigate('profile')
  }

  render() {
    const {  showModal } = this.state
    const { feeds , auth, loading } = this.props
    
    return (
      <FeedsView 
        navigateToProfile={this.navigateToProfile}
        feedsItem={feeds} 
        auth={auth}
        goback={this.goback}
        loading={loading}
        title={'On your location'}
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
