import React from 'react'
import Fire from '../../services/firebase'
import { SettingsView } from './SettingsView'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'

class SettingsContainer extends React.Component {
  static navigationOptions = {
		title: 'Settings'
  }
  
  logout = () => {
    console.log('called')
    // this.prop.signOut()
    Fire.auth().signOut()
    this.props.navigation.navigate('home')
  }

  navigateTo = (to) => () => {
    console.log(to, 'to')
    this.props.navigation.navigate(to)
  }

  render () {
    return (
      <SettingsView navigateTo={this.navigateTo} logout={this.logout} />
    )
  }
}

const mapDispatchToProp = (dispatch) => ({
  signOut: () => dispatch(logout())
})

export default connect(null, mapDispatchToProp)(SettingsContainer)