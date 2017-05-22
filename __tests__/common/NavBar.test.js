import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import NavigationBar from 'react-native-navbar';
import {NavBar, mapStateToProps} from './../../app/common/NavBar';
import ConnectedNavBar from './../../app/common/NavBar';
import {connect, Provider} from 'react-redux';
import configureStore from './../../app/store/configStore';
import RNSpinner from 'react-native-spinkit';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Platform
} from 'react-native';


describe('Component: NavBar', () => {

  let wrapper;

  const props = {
    isPad: false,
    renderRightMenu: true,
    titleText: 'text title',
    style: {}
  };

  beforeEach(() => {
    wrapper = shallow(<NavBar {...props}/>);
  });

  it('Connected NavBar renders without crashing', () => {
    wrapper = shallow(
      <Provider store={configureStore()}>
        <ConnectedNavBar {...props}/>
      </Provider>
    );
    expect(wrapper).to.have.length(1);
  });

  it('NavBar with right menu renders without crashing', () => {
    console.log(wrapper.debug());
    expect(wrapper).to.have.length(1);
  });

  it('NavBar with left menu renders without crashing', () => {
    wrapper.setProps({renderRightMenu: false});
    console.log(wrapper.debug());
    expect(wrapper).to.have.length(1);
  });

  it('NavBar has nested NavigationBar component', () => {
    expect(wrapper.find(NavigationBar)).to.have.length(1);
  });

  it('check if mapStateToProps function works fine with existing network reducer ', () => {
    const state = {networkReducer: {networkConnected: false}};
    const networkConnected = {networkConnected: false};
    expect(mapStateToProps(state)).to.be.eqls(networkConnected);
  });

  it('check if mapStateToProps function works fine without existing network reducer', () => {
    const state = {};
    const networkConnected = {networkConnected: true};
    expect(mapStateToProps(state)).to.be.eqls(networkConnected);
  });
});