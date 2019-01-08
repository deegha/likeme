import React from 'react'
import { connect } from 'react-redux'

import { ActiveUserFeedsView } from './ActiveUserFeedsView'

class ActiveUserFeeds extends React.Component {


  render () {
    const { user, feeds } = this.props

    return (
      <ActiveUserFeedsView user={user} feeds={feeds} />
    )
  }

}

const mapStateToProps = ({
  auth: {user, loading, authenticated },
  allFeeds: { feeds }
}) => ({
  user,
  loading,
  authenticated,
  
  feeds
})

export default connect(mapStateToProps)(ActiveUserFeeds)
