import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import {React, useState} from 'react'
import {icons, images} from '../constants'

const FormField = (
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200
      flex flex-row ${focus? 'border-secondary' : ''}`}>
     <TextInput
          className="flex-1 text-white font-psemibold text-base text-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          {...props}
    />

     {title == 'Password' && (
        <TouchableOpacity onPress={() => { setshowPassword(!showPassword)}} className =" justify-center">
            <Image 
               source={!showPassword ? icons.eye : icons.eyeHide}
               className="w-6 h-6"
               resizeMethod='contain'
            />
        </TouchableOpacity>
     )}    
     </View>
    </View>
  )
}

export default FormField