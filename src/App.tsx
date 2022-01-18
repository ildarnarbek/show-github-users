import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchingUsers,
  fetchingUsersSuccsess,
  catchingUsersError,
  IUser,
} from './app/reducers/users';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Userslist from './components/usersList';
import SelectedUserInfo from './components/selectedUserInfo';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const { selectedUserLogin } = useSelector((state: any) => state.users);
 

  useEffect(() => {
    dispatch(fetchingUsers);
    axios
      .get('https://api.github.com/users')
      .then((response) => response.data)
      .then(function (response: Array<IUser>): void {
        console.log(response);
        dispatch(fetchingUsersSuccsess(response.slice(0, 10)));
      })
      .catch(function (error) {
        dispatch(catchingUsersError(error));
      });
  }, [dispatch]);

  return (
    <div className='App'>
      <AppBar position='static'>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          GitHub Users
        </Typography>
      </AppBar>
      <Box component='main' sx={{px: 20, pt: 2,}}> {
        selectedUserLogin ?  <SelectedUserInfo/> :  <Userslist />
      }
      </Box>
    </div>
  );
}

export default App;
