import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import TextField from './../../app/common/TextField';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';


describe('Component: TextField', () => {
  it('it renders without crashing', () => {
    const wrapper = shallow(<TextField/>);
    expect(wrapper).to.have.length(1);
  });

  it('it has nested View component', () => {
    const wrapper = shallow(<TextField/>);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it has contain TextInput and Text components into View', () => {
    const wrapper = shallow(<TextField/>);
    expect(wrapper.find(View).containsAllMatchingElements([
      <TextInput/>,
      <Text/>
    ])).to.equal(true);
  });

  it('it pass error value into Text component', () => {
    const props = {
      style: {color: 'white'},
      error: 'error',
      value: 'test value',
      placeholder: {}
    };
    const wrapper = shallow(<TextField {...props}/>);
    expect(wrapper.find(Text).contains(props.error)).to.be.equal(true);
  });

  it('it has the correct props for TextInput component', () => {
    const props = {
      style: {color: 'white'},
      error: 'error',
      value: 'test value',
      placeholder: {}
    };
    const wrapper = shallow(<TextField {...props}/>);
    expect(wrapper.find(TextInput).prop('value')).to.be.equal('test value');
  });
});
