import React from 'react';
import {expect} from 'chai';
import authReducer, {defaultUser} from './../../app/reducers/auth';
import * as types from './../../app/actions';


describe('Reducer: Authentication Reducer', () => {
  const initialState = {
    user: defaultUser,
    token: '',
    active_watchlist_id: '',
    preferences: {},
    error: false,
    errMsg: ''
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle REQUEST_AUTHENTICATE', () => {
    const user = {
      uid: '1',
      name: 'John Doe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'JohnDoe@gmail.com',
      password: '',
      password_confirmation: '',
      provider: '',
      location: '',
      image: '',
      receive_news: false,
      terms_of_service: true,
      piwik_user_id: '12',
      piwik_user_type: 'registered'
    };

    expect(authReducer(initialState, {
      type: types.REQUEST_AUTHENTICATE,
      user: user
    }))
      .to.be.eqls({
      user: user,
      token: '',
      active_watchlist_id: '',
      preferences: {},
      error: false,
      errMsg: ''
    });
  });

  it('should handle SET_TOKEN', () => {
    const token = '12edw132';
    expect(authReducer(initialState, {
        type: types.SET_TOKEN,
        token: token
    }))
      .to.be.eqls({
        user: defaultUser,
        token: token,
        active_watchlist_id: '',
        preferences: {},
        error: false,
        errMsg: ''
    });
  });

  it('should handle ACTIVE_WATCHLIST_ID', () => {
    const id = 12;

    expect(authReducer(initialState, {
      type: types.ACTIVE_WATCHLIST_ID,
      watchlist_id: id
    }))
      .to.be.eqls({
      user: defaultUser,
      token: '',
      active_watchlist_id: id,
      preferences: {},
      error: false,
      errMsg: ''
    });
  });

  it('should handle USER_PREFERENCES', () => {
    const preferences = { preferences: ['custom preference']};

    expect(authReducer(initialState, {
      type: types.USER_PREFERENCES,
      preferences: preferences
    }))
      .to.be.eqls({
      user: defaultUser,
      token: '',
      active_watchlist_id: '',
      preferences: preferences,
      error: false,
      errMsg: ''
      });
  });

  it('should handle FILTER_ERROR', () => {
    expect(authReducer(initialState, {
      type: types.FILTER_ERROR,
      error: true,
      msg: 'error msg'
    }))
      .to.be.eqls({
      user: defaultUser,
      token: '',
      active_watchlist_id: '',
      preferences: {},
      error: true,
      errMsg: 'error msg'
    });
  });
});