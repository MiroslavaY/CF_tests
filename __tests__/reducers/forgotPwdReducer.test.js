import React from 'react';
import {expect} from 'chai';
import forgotPwdReducer from './../../app/reducers/forgotPwdReducer';
import * as types from './../../app/actions/AuthActions';


describe('Reducer: Forgot password Reducer', () => {
  const initialState = {
    error: null,
    errMsg: '',
    loading: false,
  };

  it('should return the initial state', () => {
    expect(forgotPwdReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle REQUEST_FORGOT_PWD', () => {
    expect(
      forgotPwdReducer(initialState, {
        type: types.REQUEST_FORGOT_PWD,
        loading: true,
        error: true
      }))
      .to.be.eqls({
      error: true,
      errMsg: '',
      loading: true,
    });
  });

  it('should handle RECEIVE_FORGOT_PWD', () => {
    expect(
      forgotPwdReducer(initialState, {
        type: types.RECEIVE_FORGOT_PWD,
        errMsg: 'custom msg',
        error: false
      }))
      .to.be.eqls({
      error: false,
      errMsg: 'custom msg',
      loading: false
    });
  });

});