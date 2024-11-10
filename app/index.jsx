import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import CustomButton from '../components/CustomButton';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    //to be sure that all content will be visible on all deffirent devices 
    <SafeAreaView className="bg-primary h-full">
      {/* to be able to scroll when the content is too latge that device support */}
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image 
              source= {images.cards} 
              // L'élément aura une largeur qui s'adapte à 100 % de son conteneur, mais avec une limite maximale de 380px,Sa hauteur sera fixée à 300px
              className="max-w-[380px] w-full h-[300px]"
              resizeMode='contain'
              >
          </Image>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
        
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: Embark on a Journey of Limitless
          Exploration with Aora</Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      {/* for the top bar  */}
      <StatusBar backgroundColor='#161622' style='light'/> 
    
    </SafeAreaView>
  );
}

