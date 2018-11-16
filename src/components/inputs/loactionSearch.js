import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
 
export const GooglePlacesInput = ({callback}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Promotion Location'
      minLength={2} 
      autoFocus={false}
      returnKeyType={'search'} 
      listViewDisplayed='auto'    
      fetchDetails={true}
      renderDescription={row => row.description} 
      onPress={(data, details = null) => { 
        // console.log(data, 'data')

        // console.log(details.geometry.location, 'details')
        callback(details.geometry.location)
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
          borderBottomColor: '#ffffff'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        textInput: {
          fontSize: 20,
          padding: 5,
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
  )
}