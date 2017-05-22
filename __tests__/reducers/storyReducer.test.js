import React from 'react';
import {expect} from 'chai';
import storyReducer from './../../app/reducers/storyReducer';
import * as types from './../../app/actions';



describe('Reducer: Story Reducer', () => {
  const initialState = {
    activeStoryID: false,
    action: false,
    error: false,
    errMsg: ''
  };

  it('should return the initial state', () => {
    expect(storyReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle SELECT_STORY', () => {
    expect(
      storyReducer(initialState, {
        type: types.SELECT_STORY,
        story: {id: 10}
      }))
      .to.be.eqls({
      activeStoryID: 10,
      action: false,
      error: false,
      errMsg: ''
    });
  });

  it('should handle STORY_ACTION', () => {
    expect(
      storyReducer(initialState, {
        type: types.STORY_ACTION,
        action: 'TEST_ACTION'
      }))
      .to.be.eqls({
      activeStoryID: false,
      action: 'TEST_ACTION',
      error: false,
      errMsg: ''
    });
  });

  it('should handle STORY_ERROR', () => {
    expect(
      storyReducer(initialState, {
        type: types.STORY_ERROR,
        error: true,
        errMsg: 'custon msg'
      }))
      .to.be.eqls({
      activeStoryID: false,
      action: false,
      error: true,
      errMsg: 'custon msg'
    });
  });
});