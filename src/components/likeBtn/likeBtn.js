import React from 'react'
import { connect } from 'react-redux'

import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { voteUpAction } from '../../actions/feedsActions'

class LikeBtn extends React.PureComponent {

  state = {
    btnColor: '#000'
  }

  clickLike = (id) => () => {
    this.props.voteUp(id)
  }

  render() {

    const { feedId, likesArray } = this.props
    console.log(feedId, likesArray)
    const likeCount = likesArray === 0? 0: likesArray.length

    return (
      <TouchableOpacity style={styles.btnContainer} onPress={this.clickLike(feedId)}>
        <Foundation name="heart" size={20} color={this.state.btnColor} />
        <Text style={styles.statText}>{ likeCount }</Text>
      </TouchableOpacity>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  voteUp: (feedid) => dispatch(voteUpAction(feedid))
})


export default connect(null, mapDispatchToProps)(LikeBtn)

const styles = StyleSheet.create({
	btnContainer: {
		// backgroundColor: '#ecf0f1',
		height: 20,
		width: 40,
		display:'flex',
		justifyContent:'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 100,
		margin: 8
	},

  statText: {
    fontSize: 11,
    textAlign: 'center',
    color: "#95a5a6"
  }
})