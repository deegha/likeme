import React from 'react'
import { connect } from 'react-redux'

import { RootStack } from '../../../routerStack'
import LoginPageContainer  from '../../pages/loginPage/LoginPageContainer'

class HandleAuthRedirect extends React.Component {
	render() {
		return this.props.auth.authenticated?<RootStack />:<LoginPageContainer />
	}
}

const mapStateToProps = ({auth}) => ({
	auth
})

export default connect(mapStateToProps)(HandleAuthRedirect)
 