import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:"red"
    }}>
        <Tabs.Screen name='index' options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({color,size})=>(
              <Ionicons name='search' color={color} size={size}/>
            )
        }}/>
        <Tabs.Screen name='wishlist' options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({color,size}) =>(
            <Ionicons name='heart-outline' color={color} size={size}/>
          )
        }}/>
        <Tabs.Screen name='trips' options={{
          tabBarLabel: "Trips",
          tabBarIcon:({color,size}) =>(
            <FontAwesome5 name='airbnb' color={color} size={size}/>
          )
        }}/>
        <Tabs.Screen name='inbox' options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({color,size}) =>(
            <FontAwesome5 name='inbox' color={color} size={size}/>
          )
        }}/>
        <Tabs.Screen name='profile' options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color,size}) =>(
            <FontAwesome5 name='user-circle' color={color} size={size}/>
          )
        }}/>
    </Tabs>
  )
}

export default Layout