import React from 'react';
import {expect} from 'chai';
import {
  getToken,
  setToken,
  deleteToken,
  getWatchlist,
  setWatchlist
} from './../../app/utils/Store';


describe('Utils: Store', () => {
  const itemId = 1,
    testToken = 'lksfhsdfwewer123';

  it('setWatchlist works correct', () => {
    setWatchlist(itemId).then(id => {
      expect(id).to.be.equal(itemId);
    })
  });

  it('getWatchlist works correct', () => {
    getWatchlist().then(id => {
      expect(id).not.to.be.equal(null);
    })
  });

  it('setToken works correct', () => {
    setToken(testToken).then(token => {
      expect(token).to.be.equal(testToken);
    })
  });

  it('deleteToken works correct', () => {
    deleteToken("token").then(token => {
      expect(token).to.be.equal(testToken);
    })
  });

  it('getToken rejects correct', () => {
    setToken(null).then((val) => {
      if (val === null) {
        getToken();
        return null;
      }
    }).then((token) => {
      if (token === null) {
        return Promise.reject();
      }
    }).catch((message) => {
      console.log(message);
    });
  });

  it('getToken works correct on existing token ', () => {
    setToken(testToken).then((val) => {
      return getToken();
    }).then((token) => {
      expect(token).to.be.equal(testToken);
    }).catch((message) => {
      console.log(message);
    });
  });
});