import React from 'react'
import { connect } from 'react-redux'

import { ActiveUserFeedsView } from './ActiveUserFeedsView'

class ActiveUserFeeds extends React.Component {


  render () {
    const { user } = this.props

    return (
      <ActiveUserFeedsView user={user} />
    )
  }

}

const mapStateToProps = ({auth: {user, loading, authenticated }}) => ({
  user,
  loading,
  authenticated
})

export default connect(mapStateToProps)(ActiveUserFeeds)
