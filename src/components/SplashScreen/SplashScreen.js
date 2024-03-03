import {useEffect} from 'react';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('token').then(value => {
        navigation.navigate(value === null ? 'Login' : 'HomeScreen');
      });
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
