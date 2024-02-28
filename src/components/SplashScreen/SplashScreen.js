import {useEffect} from 'react';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //  const fetchData = async() => {
      //     try{
      //       const value = await AsyncStorage.getItem('token');
      //       console.log("fetchData :" + value);

      //         return value;

      //     }catch(error){
      //       console.log(error);
      //     }

      //   }
      //   console.log("fetchData 23 :" + fetchData);

      //   navigation.navigate(
      //     fetchData === null ? 'Login' : 'HomeScreen'
      //   )

      navigation.navigate('Login');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../../images/splashscreen.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5DD61',
  },
});

export default SplashScreen;
