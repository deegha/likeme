import React from 'react'
import { connect } from 'react-redux'
import { Animated } from 'react-native'
import { ActiveUserFeedsView } from './ActiveUserFeedsView'

import { fetchUserFeeds, fetchUserLikedFeeds } from '../../actions/feedsActions'

class ActiveUserFeeds extends React.Component {

  state = {
    scrollOffset: new Animated.Value(0),
  }

  componentWillMount() {
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        if(!this.props.authenticated) {
          this.props.navigation.navigate('login')
        }
      }
    )
  }

  componentDidMount() {

    const { user, authenticated, navigation, fetchUserFeeds, fetchLikedFeeds } = this.props

    if(!authenticated) {
      navigation.navigate('login')
    }else {
      fetchUserFeeds(user.id)
      fetchLikedFeeds(user.id)
    }
  }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  }

  render () {
    const { user, userFeeds, likedFeeds } = this.props
    const { scrollOffset } = this.state

    const headerPaddingTop = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [82, 35],
      extrapolate: 'clamp',
    })

    const headerPaddingBottom = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [62, 15],
      extrapolate: 'clamp',
    })

    const titleFontSize = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [40, 20],
      extrapolate: 'clamp',
    })

    const imageWidth = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [70, 40],
      extrapolate: 'clamp',
    })
    return (
      <ActiveUserFeedsView 
        handleScroll={this.handleScroll}
        headerPaddingTop={headerPaddingTop}
        headerPaddingBottom={headerPaddingBottom}
        titleFontSize={titleFontSize}
        imageWidth={imageWidth}

        likedFeeds={likedFeeds}
        user={user} 
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
