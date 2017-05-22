import React from 'react';
import {expect} from 'chai';
import networkReducer from './../../app/reducers/networkReducer';
import * as types from './../../app/actions';


describe('Reducer: Network Reducer', () => {
  const initialState = {
    networkConnected: true
  };

  it('should return the initial state', () => {
    expect(networkReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle NETWORK_STATUS', () => {
    expect(
      networkReducer(initialState, {
        type: types.NETWORK_STATUS,
        status: false
      }))
      .to.be.eqls({
      networkConnected: false
    });
  });
});