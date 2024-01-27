import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

const Listings = () => {
    const{id} = useLocalSearchParams<{id: string}>()
  return (
    <View>
      <Text>ID</Text>
    </View>
  )
}

export default Listings