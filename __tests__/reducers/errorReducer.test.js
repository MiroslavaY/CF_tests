import React from 'react';
import {expect} from 'chai';
import errorReducer from './../../app/reducers/errorReducer';
import * as types from './../../app/actions';


describe('Reducer: Error Reducer', () => {
  const initialState = {
    error: false
  };

  it('should return the initial state', () => {
    expect(errorReducer(initialState, {type: types.USER_PREFERENCES}))
      .to.be.eqls(initialState);
  });

  /*  it('should handle ERROR', () => {
   expect(
   errorReducer(initialState, {
   type: types.ERROR,
   error: true
   }))
   .to.be.eqls({
   error: true
   });
   });*/
});