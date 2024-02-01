import { View, Text, ScrollView, Image, Touchable, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

const Listings = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [listingsdata, setListingsData] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async (): Promise<any[]> => {
      try {
        const response = await axios.get(
          'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?limit=20&refine=city%3A%22Paris%22'
        )
        const items: any[] = response.data.results
        setListingsData(items)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const listing = (listingsdata as any[]).find((item) => item.id === id)
  return (
        listing && (
          <View className = ' flex-1'>
          <ScrollView>
            <Image
            className=" h-[300px] w-screen"
            source={{ uri: listing.xl_picture_url }}
          />
          <View>
            <Text className = ' text-3xl font-bold m-1'>{listing.name}</Text>
            <Text className = ' text-lg font-semibold m-1'>{listing.room_type} in {listing.smart_location}</Text>
            <Text className = ' text-lg ml-1'>
              {listing.guests_included} guests - {listing.bedrooms} bedrooms - {listing.beds} beds - {listing.bathrooms} bathrooms
            </Text>
          </View>
          <View className = ' flex flex-row items-center gap-1 ml-1 mt-2 mb-2 '>
            <Ionicons name='star' size={18}/>
            <Text className= ' text-base font-bold'>
              {listing.review_scores_rating / 20} - {listing.number_of_reviews} reviews
            </Text>
          </View>
          <View className=' border-b-2 border-gray-500 opacity-25 mb-5'/>
          <View className='flex flex-row mt-1 items-center ml-2'>
            <Image className=' h-[50px] w-[50px] rounded-full' source={{uri:listing.host_picture_url}}/>
            <View className= ' ml-4'>
              <Text className=' text-lg font-bold'>Hosted by {listing.host_name}</Text>
              <Text className=' text-base'>
                Host since {listing.host_since}
              </Text>
            </View>
          </View>
          <View className=' border-b-2 border-gray-500 opacity-25 mt-5'/>
          <Text className=' text-justify text-[18px] mt-1'>{listing.description}</Text>
          </ScrollView>
          <View className = ' h-[70px] w-screen bg-white rounded-xl shadow-black shadow-md'>
            <View className=' flex flex-row items-center justify-between'>
              <View>
                <Text className = ' font-bold text-lg ml-2'>$ {listing.price} / night</Text>
              </View>
              <TouchableOpacity className = ' border border-red-500 bg-red-500 w-[100px] p-2 rounded-md mr-2 mt-[20px] mb-1'>
                <Text className = ' text-center text-white font-bold text-xl'>Reserve</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        )
  )
}

export default Listings
