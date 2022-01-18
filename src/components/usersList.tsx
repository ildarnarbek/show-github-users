import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IUser,
  selectingUser
} from '../app/reducers/users';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const UsersList: FC = () => {
  const { data } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();


  return (
    <>
      {data.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid container>
          {data.map((user: IUser) => {
            return (
              <Grid key={user.id} item>
                <Paper
                  sx={{
                    width: '300px',
                    m: '10px',
                    p: '10px',
                    '&:hover': {
                      color: 'red',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    },
                  }}
                  elevation={3}
                  onClick={() => dispatch(selectingUser(user.login))}
                >
                  <Grid container>
                    <Avatar src={user.avatar_url} sx={{ mr: '10px' }} />
                    <Typography variant='h5' component='div'>
                      {user.login}
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default UsersList;
