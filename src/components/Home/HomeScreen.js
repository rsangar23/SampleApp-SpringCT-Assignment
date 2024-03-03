import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList, Text} from 'react-native';
import CardItem from '../../CardItem';
import {useList} from '../../contexts/UserProvider';

const HomeScreen = ({navigation}) => {
  const {users, setUsers, findUsers} = useList();

  const onPress = () => {
    navigation.navigate('EmployeeInfo');
  };

  const openUser = user => {
    navigation.navigate('UserDetail', {user});
  };

  return (
    <View style={styles.container}>
      {!users ? (
        <Text style={styles.textStyle}>No Records</Text>
      ) : (
        <FlatList
          data={users ? users : []}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <CardItem
              style={styles.card}
              onPress={() => openUser(item)}
              user={item ? item : {}}
            />
          )}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onPress()}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>ADD EMPLOYEE</Text>
      </TouchableOpacity>
    </View>
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
  textStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 30,
    alignSelf: 'center',
  },
  card: {
    height: 200,
    width: '100%',
    backgroundColor: '#f18484',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
