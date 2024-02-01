import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
interface props {
  onCategorychanged : (category : string) => void
}
const ExploreHead = ({onCategorychanged}:props) => {

  const categories = [
  { name: 'Home', icon: 'home' },
  { name: 'Private Room', icon: 'hotel' },
  { name: 'Shared Room', icon: 'group' },
  { name: 'Trending', icon: 'whatshot' },
  { name: 'Apartment', icon: 'apartment' },
  { name: 'Villa', icon: 'house' },
  { name: 'Cottage', icon: 'cottage' },
  { name: 'Cabin', icon: 'cabin' },
  
  ];
  const [category , setcategory] = useState('Home');
  const handleCategory = (name : string) =>{
    setcategory(name);
    onCategorychanged(name);
  }
  
  return (
    <SafeAreaView className = "">
      <View className = " flex flex-row justify-around items-center bg-white ">
        <TouchableOpacity className = ' flex flex-row items-center border border-gray-500 w-[290px] rounded-full  p-2'>
        <View className = ''>
          <Ionicons name='search' size={28}/>
        </View>
        <View className = " ml-2 ">
          <Text className = " text-base font-medium">Where to?</Text>
          <Text className = " text-base font-medium">Anywhere-Any week-Add guest</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity className = ' border border-gray-500 rounded-full p-2'>
          <Ionicons name='options-outline' size={30}/>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal className = " bg-white">
        {categories.map((item,index)=>(
          <TouchableOpacity onPress={()=>handleCategory(item.name)} key={index} className ={`flex items-center mb-3 justify-around ml-3 mt-1 ${category === item.name ? 'border-b-2 border-black' : ''}`}>
            <MaterialIcons name={item.icon as any} size={25}/>
            <Text className = {`${category==item.name ? ' font-semibold':''}`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default ExploreHead