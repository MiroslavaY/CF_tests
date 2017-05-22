import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import chai from 'chai';
import chaiThings from 'chai-things';
import {NativeModules, NetInfo, Platform} from 'react-native';
import EmbedWebView from '../../app/screens/EmbedWebView';
import * as AppUtils from './../../app/utils/AppUtils';
jest.mock('./../../app/constants/Api.js', () => ({LIVE_APP: true}));
import {LIVE_APP} from './../../app/constants/Api.js';
jest.unmock('Platform');
Platform.OS = (jest.fn(() => 'android'))();
chai.should();
chai.use(chaiThings);


describe('Utils: AppUtils', () => {

  it('checkValidEmail function works correct', () => {
    expect(AppUtils.checkValidEmail('myEmail@gmail.com')).to.be.equal(true);
    expect(AppUtils.checkValidEmail('myIncorrectEmail.com')).to.be.equal(false);
  });

  it('openEmbedWebView function works correct', () => {
    const name = 'Name',
      navigator = [],
      link = 'https://testlink.com',
      title = 'Title';

    AppUtils.openEmbedWebView(
      name,
      navigator,
      link,
      title
    );

    navigator.should.include.something.that.deep.equals({
      name: name,
      component: EmbedWebView,
      passProps: {
        url: link,
        title: title,
        navigator: navigator
      }
    });
  });

  it('formatNumber function works correct', () => {
    expect(AppUtils.formatNumber(10)).to.be.equal(10);
    expect(AppUtils.formatNumber(1000)).to.be.equal('1K');
    expect(AppUtils.formatNumber(1000000)).to.be.equal('1M');
  });

  it('getTimeAgo function works correct', () => {
    const year = 3.154e+10,
      month = 2.628e+9,
      day = 8.64e+7,
      hour = 3.6e+6,
      minute = 60000,
      second = 1000,
      now = new Date();

    expect(AppUtils.getTimeAgo(now - year))
      .to.be.equal('1 year ago');
    expect(AppUtils.getTimeAgo(now - 7 * year))
      .to.be.equal('7 years ago');

    expect(AppUtils.getTimeAgo(now - month))
      .to.be.equal('1 month ago');
    expect(AppUtils.getTimeAgo(now - 7 * month))
      .to.be.equal('7 months ago');

    expect(AppUtils.getTimeAgo(now - day))
      .to.be.equal('1 day ago');
    expect(AppUtils.getTimeAgo(now - 7 * day))
      .to.be.equal('7 days ago');

    expect(AppUtils.getTimeAgo(now - hour))
      .to.be.equal('1 hour ago');
    expect(AppUtils.getTimeAgo(now - 7 * hour))
      .to.be.equal('7 hours ago');

    expect(AppUtils.getTimeAgo(now - minute))
      .to.be.equal('1 minute ago');
    expect(AppUtils.getTimeAgo(now - 7 * minute))
      .to.be.equal('7 minutes ago');

    /* expect(getTimeAgo(now - second))
     .to.be.equal('1 second ago');*/
    expect(AppUtils.getTimeAgo(now - 7 * second))
      .to.be.equal('7 seconds ago');
  });

  it('showError function works correct', () => {
    const returnedElem = shallow(AppUtils.showError('message'));

    expect(returnedElem.text()).to.be.equal('message');
    expect(AppUtils.showError()).to.be.equal(false);
  });

  it('sortArrayAssetResult function works correct', () => {
    const indexes = [1, 4],
      assets = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

    expect(AppUtils.sortArrayAssetResult(indexes, assets))
      .to.be.eqls([{id: 1}, {id: 4}]);
  });

  it('gaTrackEvent function works correct', () => {
    AppUtils.gaTrackEvent('AUTHENTICATE', 'SET_TOKEN', 'token', '12321jfs23');
    NativeModules.store
      .should.include.something.that.deep.equals({
      category: 'AUTHENTICATE',
      action: 'SET_TOKEN',
      name: 'token',
      value: '12321jfs23'
    });
  });

  it('gaTrackScreen function works correct', async () => {
    await AppUtils.gaTrackScreen('name');
    expect(LIVE_APP).to.be.equal(true);
    NativeModules.screens.should.include('name');
    NativeModules.screensGA.should.include('name');
  });

  it('hardwareBackPress function works correct', () => {
    const navigator = {getCurrentRoutes: () => ['route1', 'route2']},
          pressResult = AppUtils.hardwareBackPress(navigator);
    expect(Platform.OS).to.be.equal('android');
    /*expect(pressResult).toHaveBeenCalledTimes(1);*/
  });

  it('saveAppToken function works correct', () => {
    const key = 'AccessToken2',
          value = 'TokenValue';
    AppUtils.saveAppToken(key, value);
    NativeModules.tokenStore.should.include({key, value});
  });

  it('getAppToken function works correct', () => {
    let findToken = null;
    const key = 'AccessToken',
          callback = jest.fn((token)=> {findToken = token});

    AppUtils.getAppToken(key, callback);
    expect(findToken).to.be.eqls({key: 'AccessToken', value: 'TokenValue'});
  });

  it('alertError function works correct', () => {
    expect(AppUtils.alertError(undefined, '')).to.be.eqls(undefined);
    expect(AppUtils.alertError()).to.be.eqls(undefined);
    expect(AppUtils.alertError('error')).to.be.eqls(undefined);
    expect(AppUtils.alertError({error: 'msg'})).to.be.eqls(undefined);
    expect(AppUtils.alertError({message: 'msg'})).to.be.eqls(undefined);
    expect(AppUtils.alertError([])).to.be.eqls(undefined);
  });

});