import React from 'react'
import { connect } from 'react-redux'
import { Animated } from 'react-native'
import { ProfileView } from './ProfileView'

import { fetchUserFeeds, fetchUserLikedFeeds } from '../../actions/feedsActions'

class ActiveUserFeeds extends React.Component {

  state = {
    scrollOffset: new Animated.Value(0),
    showModal: false
  }

  componentDidMount() {

    const { user, authenticated, navigation, fetchUserFeeds, fetchLikedFeeds } = this.props

    if(!authenticated) {
      navigation.navigate('login')
    }else {
      fetchUserFeeds(user.id)
      fetchLikedFeeds(user.id)
    }

    this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log(payload)

        if(!authenticated) {
          navigation.navigate('login')
        }else {
          fetchUserFeeds(user.id)
          fetchLikedFeeds(user.id)
        }
      }
    )
  }

  componentDidUpdate(preProps) {
    const { fetchUserFeeds, fetchLikedFeeds } = this.props
    if(this.props.authenticated && preProps.authenticated !== this.props.authenticated) {
      fetchUserFeeds(this.props.user.id)
      fetchLikedFeeds(this.props.user.id)
    }
  }

  
  render () {
    const { user, userFeeds, likedFeeds, authenticated } = this.props
    
    return (
      <ProfileView 
        navigateToSettings={this.navigateToSettings}
        authenticated={authenticated}
        likedFeeds={likedFeeds}
        user={user} 
        navigation={this.props.navigation}
        userFeeds={userFeeds} />
    )
  }

}

const mapStateToProps = ({
  auth: { user, loading, authenticated },
  userFeeds: {userFeeds},
  likedFeeds
}) => ({
  user,
  loading,
  authenticated,
  userFeeds,
  likedFeeds
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserFeeds: (id) => dispatch(fetchUserFeeds(id)),
  fetchLikedFeeds: (id) => dispatch(fetchUserLikedFeeds(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUserFeeds)
