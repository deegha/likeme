/**
 * Created by deegha on 23/10/2018
 */


import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { styles } from './styles'

import * as shared from '../sharedStyles'
import { validateEmail } from '../../services/helpers'

export class TextFeild extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      error: ''
    }
  }

  onChange = (text) => {
    this.validate(text)
    this.props.onChange(this.props.feild.toLowerCase(), text)
  }

  setError = (erroText) => this.setState({error: erroText})


  validate = (text) => {
    text === ""? this.setError(this.props.feild+' feild is required'): this.setError('')
    this.setState({value: text})

    if(this.props.type === 'email') {
      !validateEmail(text)? this.setError('Enter a valid email'): this.setError('')
    }
  }

  render() {

    const { lable, placeholder, color, type  } = this.props

    let selectionColor = shared.PRIMERY_COLOR
    let placeholderTextColor = '#737373'
    let underlineColor =   shared.PRIMERY_COLOR
    let extraStyles = {
      color: '#ffffff'
    }
    
    switch(color) {
      case 'secondary':
        selectionColor = shared.PRIMERY_COLOR
        placeholderTextColor = '#737373'
        underlineColor =   shared.PRIMERY_COLOR
        extraStyles = {
          color: '#000000'
        }
  
      default:
        selectionColor = shared.PRIMERY_COLOR
        placeholderTextColor = '#737373'
        underlineColor =   shared.PRIMERY_COLOR
        extraStyles = {
          color: '#000000'
        }
    }

    let extraProps = {}

    if(type === 'email') {
      extraProps = {
        textContentType: 'emailAddress',
        keyboardType: 'email-address'
      }
    }else if (type === 'password') {
      extraProps = {
        secureTextEntry: true,
        textContentType: 'password'
      }
    }

    return (
      <View style={styles.textInputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            onBlur={()=>this.validate(this.state.value)}
            onFocus={()=>this.setError("")}
            selectionColor={selectionColor}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            onChangeText={this.onChange}
            style={[styles.inputText , extraStyles]} 
            underlineColorAndroid={underlineColor}
            value={this.state.value} 
            {...extraProps}
            />
        </View>    
        {this.state.error ?<View ><Text style={styles.textInputError}>{this.state.error}</Text></View>:<View style={[ {height: 17}]} ></View>}
      </View>
    )
  }
}
