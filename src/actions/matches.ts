export const ACCEPT_MATCH_NAME = 'ACCEPT_MATCH';
export const DECLINE_MATCH_NAME = 'DECLINE_MATCH';
export const SET_MATCHES_NAME = 'SET_MATCHES';

// ACCEPT_MATCH
export const acceptMatch = (id:string) => {
  return {
    id,
    type: ACCEPT_MATCH_NAME,
  };
};

// DECLINE_MATCH
export const declineMatch = (id:string) => {
  return {
    id,
    type: DECLINE_MATCH_NAME,
  };
};

// SET_MATCHES
export const setMatches = (matches:MatchType[]) => {
  return {
    matches,
    type: SET_MATCHES_NAME,
  };
};

// START_SET_MATCHES
// This is an asynchronous thunk action
// it fetches the matches of a certain student and then call set matches with those matches
export const startSetMatches = (api, studentId:string) => {
  return (dispatch) => {
    // This return is required in order to use the promise in the calling dispatch
    return api.fetchMatchesByStudent(studentId).then((matches) => {
      dispatch(setMatches(matches));
    });
  };
};

export const startAcceptMatch = (api, studentId:string, matchId:string) => {
  return (dispatch) => {
    return api.updateMatchByStudentAndId(studentId, matchId, { match_state: 'accepted' })
      .then((result) => {
        dispatch(acceptMatch(matchId));
      });
  };
};

export const startDeclineMatch = (api, studentId:string, matchId:string) => {
  return (dispatch) => {
    return api.updateMatchByStudentAndId(studentId, matchId, { match_state: 'declined' })
      .then((result) => {
        dispatch(declineMatch(matchId));
      });
  };
};