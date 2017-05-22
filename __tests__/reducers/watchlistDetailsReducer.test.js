import React from 'react';
import {expect} from 'chai';
import watchlistDetailsReducer from './../../app/reducers/watchlistDetailsReducer';
import * as types from './../../app/actions';
import {MAX_REQUEST_STORY_FAIL} from './../../app/constants/App';


describe('Reducer: Watchlist details Reducer', () => {
  const initialState = {
      id: '',
      name: '',
      assets: [],
      stories: [],
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    },
    assets = ['asset item1', 'asset item2'],
    stories = [{id: 1}, {id: 2}, {id: 3},];

  it('should return the initial state', () => {
    expect(watchlistDetailsReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle WATCHLIST_UPDATE', () => {
    expect(
      watchlistDetailsReducer(initialState, {
        type: types.WATCHLIST_UPDATE,
        id: 1,
        name: 'current name',
        assets: assets
      }))
      .to.be.eqls({
      id: 1,
      name: 'current name',
      assets: assets,
      stories: [],
      refreshStory: true,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });

  it('should handle SEEN_STORY', () => {
    expect(
      watchlistDetailsReducer(initialState, {
        type: types.SEEN_STORY
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [],
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: true
    });
  });

  it('should handle WATCHLIST_UPDATE_ASSETS', () => {
    expect(
      watchlistDetailsReducer(initialState, {
        type: types.WATCHLIST_UPDATE_ASSETS,
        assets: assets
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: assets,
      stories: [],
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });

  it('should handle WATCHLIST_UPDATE_STOTY', () => {
    expect(
      watchlistDetailsReducer(initialState, {
        type: types.WATCHLIST_UPDATE_STOTY,
        stories: stories
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: stories,
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });

  it('should handle REFRESH_STORY', () => {
    expect(
      watchlistDetailsReducer(initialState, {
        type: types.REFRESH_STORY,
        refreshStory: true
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [],
      refreshStory: true,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });

  it('should handle REFRESH_STORY_FAIL', () => {
    const state = Object.assign({},
      initialState,
      {numberRefreshStoryFail: MAX_REQUEST_STORY_FAIL});

    expect(
      watchlistDetailsReducer(state, {
        type: types.REFRESH_STORY_FAIL
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [],
      refreshStory: false,
      numberRefreshStoryFail: MAX_REQUEST_STORY_FAIL,
      seenAnyStory: false
    });

    expect(
      watchlistDetailsReducer(initialState, {
        type: types.REFRESH_STORY_FAIL
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [],
      refreshStory: false,
      numberRefreshStoryFail: 1,
      seenAnyStory: false
    });
  });

  it('should handle STORY_UPDATE_VOTE', () => {
    const state = Object.assign({}, initialState, {
        stories: stories
      }),
      newStory = {id: 2, description: 'text'};

    expect(
      watchlistDetailsReducer(state, {
        type: types.STORY_UPDATE_VOTE,
        newStory: {id: 5}
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: stories,
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });

    expect(
      watchlistDetailsReducer(state, {
        type: types.STORY_UPDATE_VOTE,
        newStory: newStory
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [{id: 1}, newStory, {id: 3}],
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });

  it('should handle STORY_UPDATE_RATE', () => {
    const state = Object.assign({}, initialState, {
      stories: stories
    });

    expect(
      watchlistDetailsReducer(state, {
        type: types.STORY_UPDATE_RATE,
        story: {id: 1}
      }))
      .to.be.eqls({
      id: '',
      name: '',
      assets: [],
      stories: [{id: 2}, {id: 3}],
      refreshStory: false,
      numberRefreshStoryFail: 0,
      seenAnyStory: false
    });
  });
});