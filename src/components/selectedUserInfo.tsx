import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  fetchingUsers,
  fetchingUserSuccsess,
  catchingUsersError,
  IFullUserInfo,
  selectingUser,
} from '../app/reducers/users';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SelectedUserInfo: FC = () => {
  const { displayedUser, selectedUserLogin, fetchingSelectedUser } =
    useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingUsers);
    axios
      .get(`https://api.github.com/users/${selectedUserLogin}`)
      .then((response) => response.data)
      .then(function (response: IFullUserInfo): void {
        dispatch(fetchingUserSuccsess(response));
      })
      .catch(function (error) {
        dispatch(catchingUsersError(error));
      });
  }, [selectedUserLogin, dispatch]);

  return (
    <>
      {displayedUser && !fetchingSelectedUser ? (
        <Grid container direction={'row'}>
          <Fab
            color='primary'
            aria-label='add'
            onClick={() => dispatch(selectingUser(null))}
          >
            <ArrowBackIcon />
          </Fab>
          <Grid container justifyContent={'center'}>
            <Paper
              sx={{
                width: '200px',
                m: '10px',
                p: '10px',
              }}
              elevation={3}
            >
              <Grid container direction="column" alignItems="center">
                <Avatar src={displayedUser.avatar_url} sx={{ m: '20px' }} />
                <Typography variant='h5' component='div'>
                  {displayedUser.name === null
                    ? "user don't fill name"
                    : displayedUser.name}
                </Typography>
                {displayedUser.email === null ? (
                  <p>user don't fill email</p>
                ) : (
                  <a href={`mailto:${displayedUser.email}`}>
                    {displayedUser.email}
                  </a>
                )}
                <p></p>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default SelectedUserInfo;
