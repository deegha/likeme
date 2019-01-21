/**
 * Created by deegha on 23/10/2018
 */

import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'

import * as shared from '../sharedStyles'
import { validateEmail } from '../../services/helpers'
import { FadeInView } from '../'
import { Entypo } from '@expo/vector-icons'
export class TextFeild extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type: 'text',
      value: '',
      error: ''
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if(props.error !== '') {
  //     return {error: props.error}
  //   }
  //   return {error: ""}
  // }
  componentDidMount() {
    this.props.type && this.setState({type: this.props.type})
  }

  onChange = (text) => {
    this.validate(text)
    this.props.onChange(this.props.feild.toLowerCase(), text)
  }

  setError = (erroText) => this.setState({error: erroText})

  onFocus = () => () => {
    this.props.onFocus && this.props.onFocus()
    this.setError("")
  }

  validate = (text) => {
    const emessage = this.props.name !==undefined ?this.props.name:this.props.feild

    text === ""? this.setError(emessage+' field is required'): this.setError('')
    this.setState({value: text})

    if(this.props.type === 'email') {
      !validateEmail(text)? this.setError('Enter a valid email'): this.setError('')
    }
  }

  changeType = () => {
    this.setState(preState => ({showpassword: !preState.showpassword}))
  }


  render() {

    const { lable, placeholder, color  } = this.props
    const { type, showpassword, bw } = this.state


    let selectionColor = shared.PRIMERY_COLOR
    let placeholderTextColor = '#737373'
    let underlineColor =   shared.PRIMERY_COLOR
    let extraStyles = {
      color: '#ffffff'
    }
    
    switch(color) {
      case 'secondary':
        selectionColor = shared.floatingBtnColor
        placeholderTextColor = '#737373'
        underlineColor =   shared.floatingBtnColor
        extraStyles = {
          color: '#000000'
        }
  
      default:
        selectionColor = shared.floatingBtnColor
        placeholderTextColor = '#737373'
        underlineColor =   shared.floatingBtnColor
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

    if(showpassword) {
      extraProps = {
        secureTextEntry: false
      }
    }

    return (
      <View>
        <View style={styles.textInputContainer}>
          <TextInput
            onBlur={()=>this.validate(this.state.value)}
            onFocus={this.onFocus()}
            selectionColor={selectionColor}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            onChangeText={this.onChange}
            style={[styles.inputText , extraStyles]} 
            underlineColorAndroid={'transparent'}
            value={this.state.value} 
            {...extraProps}
            />
            {(type === 'password') && (
              <TouchableOpacity onPress={this.changeType} >
                <Entypo style={styles.searchIcon} name={showpassword?'eye-with-line':'eye'} size={20} color={'#00bcd4'} />
              </TouchableOpacity>
            ) }
        </View>    
        <View style={{height: 20 }}>
          {this.state.error ? (
            <FadeInView>
              <Text style={styles.textInputError}>{this.state.error}</Text>
            </FadeInView>
          ): (
            <View/>
          )}
        </View> 
      </View>
    )
  }
}
