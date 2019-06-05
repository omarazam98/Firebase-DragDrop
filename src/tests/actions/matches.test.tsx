import {
  acceptMatch,
  declineMatch,
  setMatches,
  ACCEPT_MATCH_NAME,
  DECLINE_MATCH_NAME,
  SET_MATCHES_NAME,
} from '../../actions/matches';
import matches from '../fixtures/matches';

test('acceptMatch should create acceptMatch object', () => {
  const id = 'testid';
  const result = acceptMatch(id);
  expect(result).toEqual({
    id,
    type: ACCEPT_MATCH_NAME,
  });
});

test('declineMatch should create declineMatch object', () => {
  const id = 'testid';
  const result = declineMatch(id);
  expect(result).toEqual({
    id,
    type: DECLINE_MATCH_NAME,
  });
});

test('setMatches should create setMatches object', () => {
  const result = setMatches(matches);
  expect(result).toEqual({
    matches,
    type: SET_MATCHES_NAME,
  });
});
