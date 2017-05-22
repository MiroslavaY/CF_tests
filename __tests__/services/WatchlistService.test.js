import React from 'react';
import {expect} from 'chai';
import * as APIUtils from './../../app/utils/APIUtils';
import * as WLService from './../../app/services/WatchlistService';
import * as store from './../../app/utils/Store';


jest.mock('./../../app/utils/APIUtils', () => {
  const APIUtils = {};
  APIUtils.error = 'Request failed';
  APIUtils.response = {watchlists: null, error: null};
  APIUtils.getFetch = jest.fn((url, dispatch) => (new Promise((resolve, reject) => {
    if (dispatch) {
      resolve(APIUtils.response);
    }
    else {
      reject(APIUtils.error);
    }
  })));

  return APIUtils;
});



describe('Services: WatchlistService', () => {

  const token = '',
    dispatch = jest.fn(),
    wlID = 1,
    successCallback = jest.fn(() => true),
    failCallback = jest.fn(value => value);

  beforeEach(() => {
    failCallback.mock.calls = [];
    successCallback.mock.calls = [];
    //dispatch.mock.calls = [];
    APIUtils.response.error = null;
    APIUtils.response.watchlists = null;
  });


  describe('getWatchlistByID function test suit', () => {

    it('failCallback called when watchlist id is not exist', async () => {
      APIUtils.response.watchlists = [{}];
      await WLService.getWatchlistByID(
        token,
        dispatch,
        null,
        successCallback,
        failCallback
      );
      const callbackReturnedArgs = failCallback.mock.calls[0];
      expect(callbackReturnedArgs).to.be.eqls(['Watchlist id not found']);
    });

    it('successfully perform watchlist update', async () => {
      APIUtils.response.watchlists = [{}];
      await WLService.getWatchlistByID(
        token,
        dispatch,
        wlID,
        successCallback,
        failCallback
      );
      const dispatchArgs = dispatch.mock.calls[0][0];
      expect(dispatchArgs.type).to.be.equal('WATCHLIST_UPDATE');
    });

    it('failed watchlist update with error', async () => {
      APIUtils.response.error = 'blank list';
      await WLService.getWatchlistByID(
        token,
        dispatch,
        wlID,
        successCallback,
        failCallback
      );
      const failCallbackArgs = failCallback.mock.calls[0][0];
      expect(failCallbackArgs).to.be.equal('blank list');
    });

    it('failed watchlist update when API not response', async () => {
      await WLService.getWatchlistByID(
        token,
        dispatch,
        wlID,
        successCallback,
        failCallback
      );
      const failCallbackArgs = failCallback.mock.calls[0][0];
      expect(failCallbackArgs).to.be.equal('API not response');
    });


    it('correct catching error on request fail', () => {
      WLService.getWatchlistByID(
        token,
        null,
        wlID,
        successCallback,
        failCallback
      );
      const failCallbackArgs = failCallback.mock.calls;
      setTimeout(() => {
        expect(failCallbackArgs).to.be.equal('Request failed');
      }, 6000)
    });
  });

  describe('getActiveWatchlistByID function test suit', () => {

    it('stop function execution when watchlist id is not exist', () => {
      WLService.getActiveWatchlistByID(
        token,
        dispatch,
        null,
        successCallback,
        failCallback);

      const failCallbackArgs = failCallback.mock.calls[0][0];
      expect(failCallbackArgs).to.be.equal('Watchlist id not found')
    });

    it('setWatchlist function execute correct', () => {
      APIUtils.response.watchlists = [{}];
      WLService.getActiveWatchlistByID(
        token,
        dispatch,
        wlID,
        successCallback,
        failCallback);

      const failCallbackArgs = failCallback.mock.calls;
      expect(failCallbackArgs).to.be.eqls([]);
    });
  })
});


