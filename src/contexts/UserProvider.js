import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';

const UserContext = createContext();
const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const findUsers = () => {
    AsyncStorage.getItem('users').then(data =>
      data ? setUsers(JSON.parse(data)) : [],
    );
  };

  useEffect(() => {
    findUsers();
  }, []);

  return (
    <UserContext.Provider value={{users, setUsers, findUsers}}>
      {children}
    </UserContext.Provider>
  );
};

export const useList = () => useContext(UserContext);

export default UserProvider;
