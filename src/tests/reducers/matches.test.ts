import { matchesReducer } from '../../reducers/matches';
import matches from '../fixtures/matches';
import {
  setMatches,
  acceptMatch,
  declineMatch,
} from '../../actions/matches';

test('should set default state', () => {
  const state = matchesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('setMatches should set matches from empty state', () => {
  const action = setMatches(matches);

  const state = matchesReducer([], action);
  expect(state).toEqual(matches);
});

test('setMatches should set state from non-empty state', () => {
  const expectedMatches = matches.slice(0, -1);
  const action = setMatches(expectedMatches);

  const state = matchesReducer(matches, action);
  expect(state).toEqual(expectedMatches);
});

test('Accept match should change match state to accepted', () => {
  // verify that the match starts as not accepted
  expect(matches[0].match_state).not.toBe('accepted');
  const action = acceptMatch(matches[0].id);

  const state = matchesReducer(matches, action);
  expect(state[0].match_state).toEqual('accepted');
});

test('Decline match should change match state to rejected', () => {
  // verify that the match starts as not accepted
  expect(matches[0].match_state).not.toBe('rejected');
  const action = declineMatch(matches[0].id);

  const state = matchesReducer(matches, action);
  expect(state[0].match_state).toEqual('rejected');
});

test('Accepting match with invalid id should result in exception', () => {
  const action = acceptMatch('Invalid id');

  expect(() => {
    matchesReducer(matches, action);
  }).toThrowError;
});

test('Declining match with invalid id should result in exeption', () => {
  const action = declineMatch('Invalid id');

  expect(() => {
    matchesReducer(matches, action);
  }).toThrowError;
});
