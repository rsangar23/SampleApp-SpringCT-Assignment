import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CardItem from '../../CardItem';

const HomeScreen = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('EmployeeInfo');
  };

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      const makeList = () => {
        return currentUser.map(data => <CardItem data={data} />);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>{makeList()}</View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F193',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'black',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
