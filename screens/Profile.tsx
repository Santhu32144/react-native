import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
})

export default Profile