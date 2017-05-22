import React from 'react';
import {expect} from 'chai';
import {NativeModules, NetInfo, Platform} from 'react-native';
import EmbedWebView from '../../app/screens/EmbedWebView';
import * as APIUtils from './../../app/utils/APIUtils';


describe('Utils: APIUtils', () => {
  const url = '/example.url',
    dispatch = () => {},
    data = {user: {}},
    response = {responseData: 'ok'},
    error = {error: 'Failed'},
    connectionError = {error: "No internet connection"};

  window.fetch = jest.fn().mockImplementation((url, dispatch) => (
    url ?
      Promise.resolve({json: () => Promise.resolve(response)}) :
      Promise.reject(error)));

  afterEach(() => {
    NetInfo.isConnected.connection = true;
  });

  describe('getFetch function test suite', () => {
    it('works correct with correct args', () => {
      APIUtils.getFetch(url, dispatch).then((responseData) => {
        expect(responseData).to.be.eqls(response);
      });
    });

    it('catch an error when args are invalid', () => {
      APIUtils.getFetch().catch((errorData) => {
        expect(errorData).to.be.eqls(error);
      });
    });

    it('catch an error when internet connection fails', () => {
      NetInfo.isConnected.connection = false;
      APIUtils.getFetch('', dispatch).then((error) => {
        expect(error).to.be.eqls(connectionError);
      });
    });
  });

  describe('postFetch function test suite', () => {
    it('works correct with correct args', () => {
      APIUtils.postFetch(url, data, dispatch).then((responseData) => {
        expect(responseData).to.be.eqls(response);
      });
    });

    it('catch an error when args are invalid', () => {
      APIUtils.postFetch().catch((errorData) => {
        expect(errorData).to.be.eqls(error);
      });
    });

    it('catch an error when internet connection fails', () => {
      NetInfo.isConnected.connection = false;
      APIUtils.postFetch('', data, dispatch).then((error) => {
        expect(error).to.be.eqls(connectionError);
      });
    });

  });

  describe('deleteFetch function test suite', () => {
    it('works correct with correct args', () => {
      APIUtils.postFetch(url, data, dispatch).then((responseData) => {
        expect(responseData).to.be.eqls(response);
      });
    });

    it('catch an error when args are invalid', () => {
      APIUtils.deleteFetch().catch((errorData) => {
        expect(errorData).to.be.eqls(error);
      });
    });

    it('catch an error when internet connection fails', () => {
      NetInfo.isConnected.connection = false;
      APIUtils.deleteFetch('', data, dispatch).then((error) => {
        expect(error).to.be.eqls(connectionError);
      });
    });
  });

  describe('patchFetch function test suite', () => {
    it('works correct with correct args', () => {
      APIUtils.patchFetch(url, data, dispatch).then((responseData) => {
        expect(responseData).to.be.eqls(response);
      });
    });

    it('catch an error when args are invalid', () => {
      APIUtils.patchFetch().catch((errorData) => {
        expect(errorData).to.be.eqls(error);
      });
    });

    it('catch an error when internet connection fails', () => {
      NetInfo.isConnected.connection = false;
      APIUtils.patchFetch('', data, dispatch).then((error) => {
        expect(error).to.be.eqls(connectionError);
      });
    });
  });
});