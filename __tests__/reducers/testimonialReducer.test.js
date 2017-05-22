import React from 'react';
import {expect} from 'chai';
import testimonialReducer from './../../app/reducers/testimonialReducer';
import * as types from './../../app/actions/testimonials';


describe('Reducer: Testimonials Reducer', () => {
  const initialState = {
      pures: [],
      tweets: [],
      cache: 0,
      fetched: false,
      error: false,
    },
    reqResTestimonialAnsw = {
      pures: [],
      tweets: [],
      cache: 0,
      fetched: true,
      error: false,
    };

  it('should return the initial state', () => {
    expect(testimonialReducer(undefined, {}))
      .to.be.eqls(initialState);
  });

  it('should handle REQUEST_TESTIMONIALS', () => {
    expect(
      testimonialReducer(initialState, {
        type: types.REQUEST_TESTIMONIALS,
        fetched: true
      }))
      .to.be.eqls(reqResTestimonialAnsw);
  });

  it('should handle RECEIVE_TESTIMONIALS', () => {
    expect(
      testimonialReducer(initialState, {
        type: types.RECEIVE_TESTIMONIALS,
        fetched: true
      }))
      .to.be.eqls(reqResTestimonialAnsw);
  });

  it('should handle RECEIVE_PURE', () => {
    const pures = ['value', 'value2'];
    expect(
      testimonialReducer(initialState, {
        type: types.RECEIVE_PURE,
        pures: pures
      }))
      .to.be.eqls({
      pures: pures,
      tweets: [],
      cache: 0,
      fetched: true,
      error: false
    });
  });

  it('should handle RECEIVE_TWEET:', () => {
    const tweets = ['tweet', 'tweet2'];
    expect(
      testimonialReducer(initialState, {
        type: types.RECEIVE_TWEET,
        tweets: tweets
      }))
      .to.be.eqls({
      pures: [],
      tweets: tweets,
      cache: 0,
      fetched: true,
      error: false
    });
  });

  it('should handle TESTIMONIAL_ERROR:', () => {
    expect(
      testimonialReducer(initialState, {
        type: types.TESTIMONIAL_ERROR,
        error: true
      }))
      .to.be.eqls({
      pures: [],
      tweets: [],
      cache: 0,
      fetched: false,
      error: true
    });
  });

});