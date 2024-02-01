import { View, Text,Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
const profile = () => {
  const {isSignedIn,signOut} = useAuth();
  const {user} = useUser()
  const [first , setfirst] = useState(user?.firstName)
  const [last , setlast] = useState(user?.lastName)
  const[mail , setmail] = useState(user?.emailAddresses[0].emailAddress)
  const[edit,setedit] = useState(false)
  useEffect(()=>{
    setfirst(user?.firstName)
    setlast(user?.lastName)
    setmail(user?.emailAddresses[0].emailAddress)
  },[user])
  return (
    <View>
      <View className = ' flex flex-row items-center justify-between'>
        <Text className = ' text-lg font-bold'>Profile</Text>
        <Ionicons name='notifications-outline' size={25}/>
      </View>
      {user && <View className = ' bg-[#fff] p-[24px] w-fit h-fit rounded-2xl mt-6 mb-5 shadow-md shadow-slate-900 flex flex-col items-center justify-center'>
        <TouchableOpacity >
        <Image className=' w-[100px] h-[100px] rounded-full' source={{uri:user.imageUrl}}/>
        </TouchableOpacity>
        <View>
          {edit ? (
            <Text>EDIT</Text>
          ):(
            <View>
              <Text>
                {first}{last}
              </Text>
            </View>
          )}
        </View>
        </View>}
      {isSignedIn && <Button title='Log-Out' onPress={()=>signOut()}></Button>}
      {!isSignedIn && <Link href={'/(modals)/login'} asChild>
      <Button title='Log-In'/>
      </Link>}
    </View>
  )
}

export default profile