import React from 'react'
import { View, Modal, TouchableOpacity, Text, TouchableHighlight } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {  MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
export class GooglePlacesInput extends React.Component {

  state = {
    visible: false,
    locationDescription: ""
  }

  setVisibility = (visible) => () => this.setState({visible})

  render () {

    const { callback, location } = this.props
    const { visible, locationDescription } = this.state
    return (
      <View>
        <TouchableOpacity style={[styles.SeachIconContainer]}  onPress={this.setVisibility(true)}>
          <MaterialIcons name="add-location" size={12} color="#bdc3c7" />
          {locationDescription === "" ? 
            <Text style={styles.locationPlaceholder}>Location</Text>: 
            <Text style={styles.locatoionText}>{locationDescription}</Text> }
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.setVisibility(false)}>
            <View style={styles.modalHeader}>
              <TouchableHighlight
                onPress={this.setVisibility(false)}>
                <Text style={styles.goback}>Go back</Text>
              </TouchableHighlight>
            </View>
            <GooglePlacesAutocomplete
              placeholder='Promotion Location'
              minLength={2} 
              autoFocus={false}
              returnKeyType={'search'} 
              listViewDisplayed='auto'    
              fetchDetails={true}
              renderDescription={row => row.description} 
              onPress={(data, details = null) => {
                this.setState({
                  locationDescription:data.description,
                  visible: false
                })
                callback(details.geometry.location, data.description)
              }}
              
              getDefaultValue={() => ''}
              
              query={{
                key: 'AIzaSyBzy1UKhqfWpTSwIg6JVf-K3V4ov0tG5EU',
                language: 'en', 
                components: 'country:my'
              }}
              
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderBottomColor: '#bdc3c7',
                  borderTopColor: '#ffffff',
                  marginTop: 14
                },
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
                textInput: {
                  fontSize: 16,
                  padding: 15,
                  paddingLeft: 20,
                  marginBottom: 10,
                  marginLeft: -4,
              marginRight: 0,
                },
                container: {
                  flex:1
                }
              }}
              
              // currentLocation={true} 
              // currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food'
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter 
        
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 
            />
       
        </Modal>
      </View>
    )
  }
}
 
