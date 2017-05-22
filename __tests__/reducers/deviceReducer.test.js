import React from 'react';
import {expect} from 'chai';
import deviceReducer from './../../app/reducers/deviceReducer';
import * as types from './../../app/actions';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const currentStatusBarHeight = 20;


describe('Reducer: Device Reducer', () => {
  const initialState = {
    height: height - currentStatusBarHeight,
    width: width,
  };

  it('should return the initial state', () => {
    expect(deviceReducer(initialState, {}))
      .to.be.eqls(initialState);
  });

  it('should handle HEIGHT_CHANGE', () => {
    expect(
      deviceReducer(initialState, {
        type: types.HEIGHT_CHANGE,
        height: 80,
      }))
      .to.be.eqls({
      height: 80,
      width: width
    });
  });
});
