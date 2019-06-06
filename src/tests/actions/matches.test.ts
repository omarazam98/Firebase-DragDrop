import {
  acceptMatch,
  declineMatch,
  setMatches,
  startSetMatches,
  ACCEPT_MATCH_NAME,
  DECLINE_MATCH_NAME,
  SET_MATCHES_NAME,
  startAcceptMatch,
  startDeclineMatch,
} from '../../actions/matches';
import matches from '../fixtures/matches';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchMatchByStudentAndId, updateMatchByStudentAndId, addMatchToStudent } from '../../api/matches';

let mockAPI;

beforeEach(() => {
  // In order to test the asynchronous actions without the hitting firebase
  // we need to be able to simulate database actions by mocking the matches api
  // we can simulate different returns from the api, as well as call failures
  mockAPI = {
    fetchMatchesByStudent: jest.fn(),
    fetchMatchByStudentAndId: jest.fn(),
    updateMatchByStudentAndId: jest.fn(),
    addMatchToStudent: jest.fn(),
  };
});

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

const createMockStore = configureMockStore([thunk]);

test('startSetMatches should dispatch a set objects matches with api call return', () => {
  mockAPI.fetchMatchesByStudent.mockResolvedValue(matches);
  const store = createMockStore({});

  store.dispatch(startSetMatches(mockAPI, 'anyId')).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      matches,
      type: SET_MATCHES_NAME,
    });
  });
});

test('startAcceptMatch should dispatch an accept match on successful api call', () => {
  mockAPI.updateMatchByStudentAndId.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];

  store.dispatch(startAcceptMatch(mockAPI, 'anyId', match.id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ACCEPT_MATCH_NAME,
      id: match.id,
    });
  });
});

test('startDeclineMatch should dispatch a decline on successful api call', () => {
  mockAPI.updateMatchByStudentAndId.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];

  store.dispatch(startDeclineMatch(mockAPI, 'anyId', match.id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: DECLINE_MATCH_NAME,
      id: match.id,
    });
  });
});

test('startSetMatches should reject promise on failed api call', (done) => {
  mockAPI.fetchMatchesByStudent.mockRejectedValue('Failed api call');
  const store = createMockStore({});

  expect(store.dispatch(startSetMatches(mockAPI, 'anyId')))
    .rejects
    .toMatch('Failed api call')
    .then(() => {
      const actions = store.getActions();
      expect(
        actions,
      ).toEqual([]);
      done();
    });
});

test('startAcceptMatch should reject promise on failed api call', (done) => {
  mockAPI.updateMatchByStudentAndId.mockRejectedValue('Failed api call');

  const store = createMockStore({});
  expect(store.dispatch(startAcceptMatch(mockAPI, 'eh', 'more')))
    .rejects
    .toMatch('Failed api call').then(() => {
      const actions = store.getActions();
      expect(
        actions,
      ).toEqual([]);
      done();
    });
});

test('startDeclineMatch should reject promise on failed api call', (done) => {
  mockAPI.updateMatchByStudentAndId.mockRejectedValue('Failed api call');

  const store = createMockStore({});
  expect(
    store.dispatch(startDeclineMatch(mockAPI, 'eh', 'more')),
  ).rejects.toMatch('Failed api call').then(() => {
    const actions = store.getActions();
    expect(
      actions,
    ).toEqual([]);
    done();
  });
});
