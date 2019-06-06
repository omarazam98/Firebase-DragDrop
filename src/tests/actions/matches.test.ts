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

let mockAPI;

beforeEach(() => {
  // In order to test the asynchronous actions without the hitting firebase
  // we need to be able to simulate database actions by mocking the matches api
  // we can simulate different returns from the api, as well as call failures
  mockAPI = {
    addMatch: jest.fn(),
    fetchSeniorMatchByStudentAndSenior: jest.fn(),
    fetchStudentMatchByStudentAndSenior: jest.fn(),
    fetchMatchesByStudent: jest.fn(),
    fetchMatchesBySenior: jest.fn(),
    updateMatchByStudentAndSenior: jest.fn(),
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
  const type = 'student';

  store.dispatch(startSetMatches(mockAPI, type, 'anyId')).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      matches,
      type: SET_MATCHES_NAME,
    });
  });
});

test('startAcceptMatch from student should dispatch an accept match on successful api call', () => {
  mockAPI.updateMatchByStudentAndSenior.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];
  const type = 'student';

  store.dispatch(startAcceptMatch(mockAPI, type, 'anyId', match.person_id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ACCEPT_MATCH_NAME,
      id: match.person_id,
    });
  });
});

test('startAcceptMatch from senior should dispatch an accept match on successful api call', () => {
  mockAPI.updateMatchByStudentAndSenior.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];
  const type = 'student';

  store.dispatch(startAcceptMatch(mockAPI, type, 'anyId', match.person_id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ACCEPT_MATCH_NAME,
      id: match.person_id,
    });
  });
});

test('startDeclineMatch should dispatch a decline on successful api call', () => {
  mockAPI.updateMatchByStudentAndSenior.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];
  const type = 'student';

  store.dispatch(startDeclineMatch(mockAPI, type, 'anyId', match.person_id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: DECLINE_MATCH_NAME,
      id: match.person_id,
    });
  });
});

test('startDeclineMatch should dispatch a decline on successful api call', () => {
  mockAPI.updateMatchByStudentAndSenior.mockResolvedValue(undefined);
  const store = createMockStore({});
  const match = matches[0];
  const type = 'student';

  store.dispatch(startDeclineMatch(mockAPI, type, 'anyId', match.person_id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: DECLINE_MATCH_NAME,
      id: match.person_id,
    });
  });
});

test('startSetMatches should reject promise on failed api call', (done) => {
  mockAPI.fetchMatchesBySenior.mockRejectedValue('Failed api call');
  const store = createMockStore({});
  const type = 'senior';

  expect(store.dispatch(startSetMatches(mockAPI, type, 'anyId')))
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
  mockAPI.updateMatchByStudentAndSenior.mockRejectedValue('Failed api call');
  const type = 'student';

  const store = createMockStore({});
  expect(store.dispatch(startAcceptMatch(mockAPI, type, 'eh', 'more')))
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
  mockAPI.updateMatchByStudentAndSenior.mockRejectedValue('Failed api call');
  const type = 'senior';

  const store = createMockStore({});
  expect(
    store.dispatch(startDeclineMatch(mockAPI, type, 'eh', 'more')),
  ).rejects.toMatch('Failed api call').then(() => {
    const actions = store.getActions();
    expect(
      actions,
    ).toEqual([]);
    done();
  });
});
