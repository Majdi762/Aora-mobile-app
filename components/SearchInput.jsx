import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import {React, useState} from 'react'
import {icons, images} from '../constants'

const SearchInput = (
    {
      title,
      value,
      placeholder,
      handleChangeText,
      otherStyles,
      ...props
    }
) => {
  const [showPassword, setshowPassword] = useState(false);
  const [focus, setfocus] = useState(false)

  return (
      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200
      flex flex-row space-x-4 items-center ${focus? 'border-secondary' : ''}`}>
     <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder='Search for a video topic'
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          {...props}
    />

     <TouchableOpacity>
         <Image 
            source={icons.search} 
            className="w-5 h-5" 
            resizeMode="contain" 
        />
     </TouchableOpacity>  
     </View>
  )
}

export default SearchInput