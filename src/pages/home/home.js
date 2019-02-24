/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { connect } from 'react-redux'
import { Animated,View } from 'react-native'
import { fetchAllFeeds } from '../../actions/feedsActions'
import { setWatingAction } from '../../actions/waitingActions'
import { HomeView } from './HomeView'
import Fire from '../../services/firebase'

class HomeContainer extends React.Component {

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

  navigateTol = () => () => {
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

  navigateTo = (to,props) => () => {
    this.props.navigation.navigate(to,  {filter: props} )
  }
  
  setModalVisibleAfterPost = () => this.setState({showModal: false})

  render() {
    const { scrollOffset, showModal } = this.state
    const { feeds , auth , loading, creating } = this.props
    const lastestDeals= feeds.slice(0, 8)
    const fashion = feeds.filter(feed => feed.category === 'fashion')
    return (
        <HomeView 
          feedsItems={lastestDeals} 
          auth={auth}
          navigateToProfile={this.navigateToProfile}  
          loading={loading && lastestDeals.length < 1 }
          createPost={this.createPost}
          navigation={this.props.navigation}
          showModal={showModal}
          setModalVisibleAfterPost={this.setModalVisibleAfterPost}
          setModalVisible={this.setModalVisible}
          navigateTol={this.navigateTol}
          navigateTo={this.navigateTo}
          fashion={fashion}
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

export default connect (mapStateToProps, mapDispatchToProps)(HomeContainer)
