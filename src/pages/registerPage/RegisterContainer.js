import React from  'react'

import { RegisterView } from './RegisterView'
import { ImagePicker, Permissions } from 'expo'

import Fire  from '../../services/firebase'

import { UserModel } from '../../dataModels/user'
import { createUser } from '../../services/backendClient'
import { uploadImageAsync } from '../../services/utils'

class RegisterContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      propic: '',
      name: '',
      email:'',
      password: '',
      confirmPassword: '',
      formError: '',
      creating: false
    }
  }

	static navigationOptions = {
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#fff'
  }
   
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    await Permissions.askAsync(Permissions.CAMERA)
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({ propic: result.uri })
    }
  }

  setFormError = (message) => this.setState({formError : message})

  onSubmit = () => {
    this.setState({creating: true})
    // if(this.state.password !== this.state.confirmPassword) {
    //   this.setFormError("Password mismatch")
    //   return  false
    // }

    if(this.state.email === "" || this.state.password === "") {
      this.setFormError("Email and password are requied")
      return  false
    }

    Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
      const user = UserModel

      uploadImageAsync(this.state.propic, 'userImages')
        .then(photoUrl => {

        user.id = res.user.uid
        user.displayName = this.state.name
        user.email = res.user.email
        user.image = photoUrl

        createUser(
          res.user.uid,
          user
        )
        this.setState({creating: false})
      })

    }).catch(err => {
      this.setFormError(err.message)
      this.setState({creating: false})
    })
  }

  onChange = (feild, value) => this.setState(
    {[feild]: value, setFormError: ""}
  )

  render() {
    console.log(this.state)
    return (
      <RegisterView 
        creating={this.state.creating}
        formError={this.state.formError}
        onSubmit={this.onSubmit}
        onChange={this.onChange} 
        pickImage={this.pickImage} 
        data={this.state}/>
    )
  }
}


export default RegisterContainer