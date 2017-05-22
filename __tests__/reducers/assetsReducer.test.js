import React from 'react';
import {expect} from 'chai';
import assetsReducer from './../../app/reducers/assetsReducer';
import * as types from './../../app/actions';


describe('Reducer: Assets Reducer', () => {
  const initialState = {
    indexAssets: [],
    error: false,
    errMsg: ''
  };

  it('should return the initial state', () => {
    expect(assetsReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle ASSET_INDEX', () => {
    expect(
      assetsReducer({}, {
        type: types.ASSET_INDEX,
        value: [1, 2, 3],
      }))
      .to.be.eqls({
        indexAssets: [1, 2, 3],
        error: false
    });
  });

  it('should handle ASSET_ERROR', () => {
    expect(
      assetsReducer({}, {
        type: types.ASSET_ERROR,
        error: true,
        errMsg: 'error message'
      }))
      .to.be.eqls({
        error: true,
        errorMsg: 'error message'
    });
  });
});