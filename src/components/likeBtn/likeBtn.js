import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import { Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native'
import { Foundation, EvilIcons } from '@expo/vector-icons'
import { voteUpAction } from '../../actions/feedsActions'

class LikeBtn extends React.PureComponent {

  state = {
    likeFontSize: new Animated.Value(11),
    liked: false,
    likeCount: 0
  }

  componentDidUpdate(props) {
    if(props.likeCount !== this.props.likeCount) {
      this.setState({likeCount: this.props.likeCount})
      this.animate()
    }
     

    if(props.liked !== this.props.liked ) 
      this.setState({liked: this.props.liked})
  }

  componentDidMount() {
   
    this.setState({liked: this.props.liked, likeCount: this.props.likeCount})
   
  }

  clickLike = (id) => () => {
    if(!this.props.authenticated) {
      this.props.navigation.navigate('login')
    }else {
      this.setState(preState => ({liked: true,likeCount: preState.likeCount+1 }),()=> this.animate())
      this.props.voteUp(id)
    }

  }

  animate = () => {
    Animated.timing(                  
      this.state.likeFontSize,            
      {
        toValue: 20,    
        easing: Easing.back(),              
        duration: 100,              
      }
    ).start(() => {
      Animated.timing(                  
        this.state.likeFontSize,            
        {
          toValue: 11,    
          easing: Easing.back(),              
          duration: 100,              
        }
      ).start()
    })
  }

  render() {

    
    
    const { feedId } = this.props
    const { likeFontSize, liked, likeCount } = this.state

   
    return (
      <TouchableOpacity style={styles.btnContainer} onPress={this.clickLike(feedId)}>
        {liked? 
          <Foundation name="heart" size={20} color={'#ED4C67'} />:
          <EvilIcons name="heart" size={20} color={'#ED4C67'} />
        }
        <Animated.Text style={[
          styles.statText,
          {fontSize: likeFontSize}
        ]}>{ likeCount > 0 && likeCount }</Animated.Text>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  voteUp: (feedid, userGeo) => dispatch(voteUpAction(feedid, userGeo))
})

const mapStateToProps = ( { auth:{authenticated}, allFeeds } ) => ({
  authenticated,
  allFeeds
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LikeBtn)) 

const styles = StyleSheet.create({
	btnContainer: {
		height: 20,
		display:'flex',
		justifyContent:'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 100,
		margin: 8
	},

  statText: {
    fontSize: 11,
    textAlign: 'center',
    color: "#95a5a6",
    marginLeft: 5
  }
})