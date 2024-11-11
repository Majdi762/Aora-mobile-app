import { View, Text, FlatListComponent, FlatList, Image, RefreshControl, Alert } from 'react-native'
import {React, useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  // get data and rename it to posts
  const {data : posts, refetch} = useAppwrite(getAllPosts);

  // () => {} : Pas de retour explicite (retourne undefined par défaut).
  // () => () : Retourne directement le résultat de l'expression (ici () retourne une fonction vide).
  const [refreshing, setrefreshing] = useState(false)

  const onRefresh = async () => {
    setrefreshing(true);
    // re call videos -> if any new videos apeard
     await refetch();
    setrefreshing(false);

  }
  console.log(posts);
  return (
    <SafeAreaView className='bg-primary h-full'>
      {/* use FlatList because SafeAriaView doesn't support horizental and vertical scroll in the same time   */}
      <FlatList
          data={posts}
          // data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) =>(
            <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>Welcome back</Text>
                  <Text className='text-2xl font-psemibold text-white'>JSMastry</Text>
                </View>
                
               <View className='mt-1.5'>
                 <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                />
               </View>

              </View>
              <SearchInput/>

              <View className='w-full flaex-1 pt-5 pb-8'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Videos
                </Text>

                <Trending posts={[{id:1}, {id:2}, {id:3}] ?? []}/>
                {/* ?? means if doesn't exist */}
              </View>

            </View>
          
          )}
          //if posts is empty then we show empty instead videos 
          ListEmptyComponent={() => (
            <EmptyState
               title="No Videos Found"
               subTitle="Be the first one to upload a video"
            />
          )}

          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

      />
    </SafeAreaView>
  )
}

export default Home