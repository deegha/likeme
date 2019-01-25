/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { connect } from 'react-redux'
import { Animated,View } from 'react-native'
import { fetchAllFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import { FeedsView } from '../../components'
import Fire from '../../services/firebase'
import Geohash from 'latlon-geohash'

class AllFeeds extends React.Component {

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

  componentDidMount() {
    this.props.getAllFeeds()  
  }

  componentDidUpdate(preProps) {
    
    const action = this.props.navigation.getParam('action')
    if(action === 'create_post') {
      this.createPost()
    }

    if(preProps.auth.authenticated !== this.props.auth.authenticated) {
      this.props.getAllFeeds()  
    }

  }

  // componentWillReceiveProps(newPros) {
  //   console.log(newPros.feeds)
  // }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity
    this.state.scrollOffset.setValue(offset)
  }

  navigateTol = () => {
    console.log('cliked')
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
    const { scrollOffset, showModal } = this.state
    const { feeds , auth , loading, creating } = this.props
    const titleMarginTop = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [70, 20],
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
          
          loading={loading}
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

const mapStateToProps = ({allFeeds: {feeds, loading, creating}, auth, waitingAction}) => ({
	feeds,
	loading,
	creating,
	auth,
	waitingAction: waitingAction.waitingAction
})

const mapDispatchToProps = (dispatch) => ({
	getAllFeeds: () => dispatch(fetchAllFeeds()),
	setWatingAction: (action, params) => dispatch(setWatingAction(action, params)),
	voteUp: (feedId) => dispatch(voteUpAction(feedId))
})

export default connect (mapStateToProps, mapDispatchToProps)(AllFeeds)
