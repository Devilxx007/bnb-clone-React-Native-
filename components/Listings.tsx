import { View, Text, ListRenderItem, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
interface Props{
    listings: any[];
    category: string
}
const Listings = ({ category, listings: items }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  // const [heartStates, setHeartStates] = useState(Array(items.length).fill(false));

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, [category]);

  // const handleHeartPress = (index: number) => {
  //   setHeartStates((prev) => {
  //     const newHeartStates = [...prev];
  //     newHeartStates[index] = !newHeartStates[index];
  //     return newHeartStates;
  //   });
  // };

  const renderList: ListRenderItem<any> = ({ item, index }) => {
    // Check if medium_url is available
    if (!item.medium_url) {
      return null; // Skip rendering this item if no image is available
    }

    // const isHeartFilled = heartStates[index];

    return (
      <Link href={`../listings/${item.id}`} asChild>
        <TouchableOpacity>
          <View className='' >
            <Image className='w-full rounded-lg mt-[30px] h-[300px]' source={{ uri: item.medium_url }} />
            <TouchableOpacity
              className='absolute right-[20px] top-[45px]'
              // onPress={() => handleHeartPress(index)}
            >
              {/* <Ionicons
                name={isHeartFilled ? 'heart' : 'heart-outline'}
                size={25}
                color={isHeartFilled ? '#E75480' : 'black'}
              /> */}
            </TouchableOpacity>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-lg font-semibold'>{item.name}</Text>
            </View>
            <Text className='text-base font-medium'>{item.room_type}</Text>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Text className='font-bold text-base mr'>${item.price}</Text>
                <Text className='text-base'>/night</Text>
              </View>
              <View className='flex flex-row items-center'>
                <Ionicons name='star' size={18} />
                <Text className='text-base ml-1'>{item.review_scores_rating / 20}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View className='ml-2 mb-1 mr-2'>
      <FlatList keyExtractor={(item) => item.id.toString()} data={loading ? [] : items} ref={listRef} renderItem={renderList} />
    </View>
  );
};

export default Listings;