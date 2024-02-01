import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import ExploreHead from '@/components/ExploreHead'
import Listings from '@/components/Listings'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const index = () => {
  const [listingsdata,setListingsData] = useState<any[]>()
  useEffect(() => {
    const fetchData = async (): Promise<any[]> => {
      try {
        const response = await axios.get(
          'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?limit=50&refine=city%3A%22Paris%22'
        );
        const items: any[] = response.data.results;
        setListingsData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const[category , setcategory] = useState('Home')
  const onDataChanged = (category : string) =>{
    setcategory(category);
  }
  return (
    <View className = ' flex-1'>
      <Stack.Screen options={{
        header:()=> <ExploreHead onCategorychanged={onDataChanged}/>
      }} />
      <Listings  category={category} listings={listingsdata}/>
      
    </View>
  )
}

export default index
