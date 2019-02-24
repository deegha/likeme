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

class AllFeeds extends React.Component {

  static navigationOptions = {
		header: null 
	}

	constructor(props) {
		super(props)
		this.state = {
      showModal:false
		}
	}

  logout = () => Fire.auth().signOut()

  componentDidMount() {
    if(this.props.feeds.length < 1) {
      this.props.getAllFeeds()
    }
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

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity
    this.state.scrollOffset.setValue(offset)
  }

  navigateTol = () => {
    console.log('cliked')
    this.props.navigation.navigate("login")
  }

  navigateToProfile = () => {
    if(this.props.auth.authenticated) {
      this.props.navigation.navigate("profile")
    }else {
      this.props.navigation.navigate("login")
    }
    
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
  
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
  
    const {  showModal } = this.state
    const { feeds , auth , loading, creating, navigation } = this.props
    const filter = navigation.getParam('filter', 'all')
    let filteredFeeds = feeds
    let title = 'Hot'
    if(filter !== 'all') {
      title = this.capitalize(filter)
      filteredFeeds = feeds.filter(feed => {
        return feed.category === filter
      })
    }
     
    return (
      <FeedsView 
        goback={this.goback}
        title={title}
        feedsItem={filteredFeeds} 
        auth={auth}
        navigateToProfile={this.navigateToProfile}  
        loading={loading && Object.keys(filteredFeeds) < 1}
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
