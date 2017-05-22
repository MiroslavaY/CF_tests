import React from 'react';
import {expect} from 'chai';
import {filtersReducer} from './../../app/reducers/filtersReducer';
import * as types from './../../app/actions';


describe('Reducer: Filter Reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  /*  it('should handle ERROR', () => {
   expect(
   filtersReducer(initialState, {
   type: types.ERROR,
   error: true
   }))
   .to.be.eqls({
   error: true
   });
   });*/
});