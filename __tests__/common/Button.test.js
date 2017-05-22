import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Button from './../../app/common/Button';
import RNSpinner from 'react-native-spinkit';
import  {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';


describe('Component: Button', () => {

  let wrapper;
  const props = {
    buttonText: 'button text',
    isDisabled: false,
    onPress: () => {
    },
    textStyle: {},
    style: {},
    underlayColor: {},
  };

  beforeEach(() => {
    wrapper = shallow(<Button {...props}/>);
  });

  it('it renders without crashing', () => {
    expect(wrapper).to.have.length(1);
  });

  it('it has nested TouchableHighlight component', () => {
    expect(wrapper.find(TouchableHighlight)).to.have.length(1);
  });

  it('it contains View component into TouchableHighlight', () => {
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it contains Text and RNSpinner components into View', () => {
    const viewComponent = wrapper.find(View);

    expect(viewComponent.find(Text)).to.have.length(1);
    expect(viewComponent.find(RNSpinner)).to.have.length(1);

  });

  it('it has button text into Text component', () => {
    const textComponent = wrapper.find(View).find(Text);

    expect(textComponent.contains(props.buttonText)).to.be.equal(true);
  });

  //TODO: ask about branching in pad dimension problems with ipad dimension
  it('RNSpinner with no pad dimension size renders without crashing ', () => {
    const wrapper = shallow(<RNSpinner/>);
    wrapper.setProps({size: 30});

    wrapper.update();
    expect(wrapper.prop('size')).to.be.equal(30);
  });

  it('calls onClick props and sets clicked state to true when clicked', () => {
    const mockFunction = jest.fn(() => 'Pressed');
    const wrapper = shallow(<Button {...props} onPress={mockFunction}/>);
    const properties = wrapper.instance().props;

    expect(properties.onPress()).to.be.equal('Pressed');
    expect(mockFunction).to.be.called;
  });

});