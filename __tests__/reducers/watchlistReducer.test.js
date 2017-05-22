import React from 'react';
import {expect} from 'chai';
import watchlistReducer from './../../app/reducers/watchlistReducer';
import * as types from './../../app/actions';


describe('Reducer: Authentication Reducer', () => {
  const initialState = {
      watchlists: [],
      cached: 0,
      error: false,
      errorMsg: '',
      loading: false,
    },
    watchlists = [{id: 1}, {id: 2}, {id: 3}];

  it('should return the initial state', () => {
    expect(watchlistReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle WATCHLIST_UPDATE_NAME', () => {
    const state = Object.assign({}, initialState, {
      watchlists: watchlists
    });

    expect(
      (watchlistReducer(state, {
        type: types.WATCHLIST_UPDATE_NAME,
        watchlist: {id: 1, name: 'first'}
      })))
      .to.be.eqls({
      watchlists: [{id: 1, name: 'first'}, {id: 2}, {id: 3}],
      cached: 0,
      error: false,
      errorMsg: '',
      loading: false
    });
  });

  it('should handle REQUEST_WATCHLISTS', () => {
    expect(
      (watchlistReducer(initialState, {
        type: types.REQUEST_WATCHLISTS,
        loading: true
      })))
      .to.be.eqls({
      watchlists: [],
      cached: 0,
      error: false,
      errorMsg: '',
      loading: true
    });
  });

  it('should handle RECEIVE_WATCHLISTS', () => {
    const receivedObj = watchlistReducer(initialState, {
        type: types.RECEIVE_WATCHLISTS,
        watchlists: watchlists,
        loading: true
      }),
      patternObj = {
        watchlists: watchlists,
        cached: new Date().getSeconds(),
        error: false,
        errorMsg: '',
        loading: true
      };

    expect(receivedObj.watchlists).to.be.eqls(patternObj.watchlists);
    expect(receivedObj.error).to.be.eqls(patternObj.error);
    expect(receivedObj.errorMsg).to.be.eqls(patternObj.errorMsg);
    expect(receivedObj.loading).to.be.eqls(patternObj.loading);
    expect(typeof receivedObj.cached).to.be.equal("number");
  });

  it('should handle WL_ERROR', () => {
    expect(
      (watchlistReducer(initialState, {
        type: types.WL_ERROR,
        msg: 'error msg',
        error: true
      })))
      .to.be.eqls({
      watchlists: [],
      cached: 0,
      error: true,
      errorMsg: 'error msg',
      loading: false
    });
  });
});