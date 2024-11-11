import { useState, useEffect} from 'react'
import {Alert} from 'react-native'
// custom hook
const useAppwrite = (fn) => {
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true)
  
    //on peut pas declarer useEffect comme async function
    const fetchData = async () => {
        setisLoading(true);
        try {

           const response = await fn();
           setdata(response);
           
        } catch (error) {
          Alert.alert('Error', error.message);
          console.log(error);
          
        } finally {
          setisLoading(false);
        }
    }

    useEffect(() => {
      fetchData();
    }, [])
  
  const refetch = () => fetchData();
  return {data, isLoading, refetch};
}
export default useAppwrite;