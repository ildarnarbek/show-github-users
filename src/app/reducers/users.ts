import { createReducer, createAction } from '@reduxjs/toolkit';

export interface IUser {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean
}

export interface IFullUserInfo {
  login: string,
  id: 1,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
  name: string,
  company: string,
  blog: string,
  location: string,
  email: string,
  hireable: boolean,
  bio: string,
  twitter_username: string,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string,
}

export interface IUsersState {
  data: Array<IUser>,
  fetchingUserList: boolean,
  error: string | null,
  selectedUserLogin: string | null,
  fetchingSelectedUser: boolean, 
  displayedUser: IFullUserInfo | null

}

const initialState: IUsersState = {
  data: [],
  fetchingUserList: false, 
  error: null,
  selectedUserLogin: null,
  fetchingSelectedUser: false, 
  displayedUser: null
}

export const fetchingUsers = createAction<boolean>('users/fetchingUsers')
export const fetchingUsersSuccsess = createAction<IUser[]>('users/fetchingUsersSuccess');
export const catchingUsersError = createAction<any>('users/catchingUsersError');
export const selectingUser = createAction<string | null>('users/selectingUser');

export const fetchingUser = createAction<boolean>('user/fetchingUser')
export const fetchingUserSuccsess = createAction<IFullUserInfo>('user/fetchingUserSuccess');
export const catchingUserError = createAction<any>('user/catchingUsersError');


const users = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchingUsers, (state) => {
      state.fetchingUserList = true;
    })
    .addCase(fetchingUsersSuccsess, (state, action) => {
      state.data = action.payload
      state.fetchingUserList = false;
    })
    .addCase(catchingUsersError, (state, action)=> {
      state.error = action.payload.error;
    })

    .addCase(selectingUser, (state, action) => {
      state.selectedUserLogin = action.payload
    })

    .addCase(fetchingUser, (state) => {
      state.fetchingSelectedUser = true;
    })
    .addCase(fetchingUserSuccsess, (state, action) => {
      state.displayedUser = action.payload
      state.fetchingSelectedUser = false;
    })
    .addCase(catchingUserError, (state, action)=> {
      state.error = action.payload.error;
    })

});


export default users;
