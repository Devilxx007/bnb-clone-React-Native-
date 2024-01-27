import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'
import { useRouter } from 'expo-router'
enum Strategy {
  google = 'oauth_google',
  apple = 'oauth_apple',
  facebook = 'oauth_facebook'
}
const login = () => {
  const router = useRouter()
  useWarmUpBrowser()
  const { startOAuthFlow: appleauth } = useOAuth({ strategy: 'oauth_apple' })
  const { startOAuthFlow: googleauth } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: facebookauth } = useOAuth({
    strategy: 'oauth_facebook'
  })

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.apple]: appleauth,
      [Strategy.google]: googleauth,
      [Strategy.facebook]: facebookauth
    }[strategy]

    try {
      const { createdSessionId, setActive } = await selectedAuth()
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (e) {
      console.error('error in auth')
    }
  }

  return (
    <View className=" flex justify-center items-center mt-4">
      <TextInput
        className=" border border-black p-1 rounded-lg w-[280px] h-[40px]"
        placeholder="Email"
      />
      <TouchableOpacity className=" border mt-3 rounded-lg p-1 border-red-600 w-[280px] h-[40px] bg-red-500">
        <Text className=" text-lg text-center font-bold text-white">
          Continue
        </Text>
      </TouchableOpacity>

      <View className=" border-b w-screen mt-5 shadow-md">
        <Text className=" text-center">or</Text>
      </View>
      <View className=" mt-5">
        <TouchableOpacity className=" flex border rounded-lg border-black flex-row items-center justify-around w-[280px] h-[50px]">
          <Ionicons name="call" size={25} />
          <Text className=" text-lg font-semibold">Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.facebook)}
          className=" flex flex-row rounded-lg mt-4 border border-black items-center justify-around w-[280px] h-[50px]"
        >
          <Ionicons name="logo-facebook" size={25} />
          <Text className=" text-lg font-semibold">Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.google)}
          className=" flex flex-row rounded-lg mt-4 border border-black items-center justify-around w-[280px] h-[50px]"
        >
          <Ionicons name="logo-google" size={25} />
          <Text className=" text-lg font-semibold">Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.apple)}
          className=" flex flex-row rounded-lg mt-4 items-center border border-black justify-around w-[280px] h-[50px]"
        >
          <Ionicons name="logo-apple" size={25} />
          <Text className=" text-lg font-semibold">Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default login
