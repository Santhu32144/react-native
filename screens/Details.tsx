import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details</Text>
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

export default Details