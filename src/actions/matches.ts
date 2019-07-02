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
export const startSetMatches = (api, type:'student' | 'senior', id:string) => {
  return (dispatch) => {
    // This return is required in order to use the promise in the calling dispatch
    if (type === 'student') {
      return api.fetchMatchesByStudent(id).then((matches) => {
        dispatch(setMatches(matches));
      });
    } if (type === 'senior') {
      return api.fetchMatchesBySenior(id).then((matches) => {
        dispatch(setMatches(matches));
      });
    }
    throw `${type} type of match search is invalid`;
  };
};

export const startAcceptMatch = (
  api,
  type:'student' | 'senior',
  accountId:string,
  matchId:string,
) => {
  return (dispatch) => {
    let studentId;
    let seniorId;
    if (type === 'student') {
      studentId = accountId;
      seniorId = matchId;
    } else if (type === 'senior') {
      studentId = matchId;
      seniorId = accountId;
    } else {
      throw `${type} type of match is invalid`;
    }
    return api.updateMatchByStudentAndSenior(studentId, seniorId, { match_state: 'accepted' })
      .then((result) => {
        dispatch(acceptMatch(matchId));
      });
  };
};

export const startDeclineMatch = (
  api,
  type: 'student' | 'senior',
  studentId:string,
  seniorId:string,
) => {
  return (dispatch) => {
    return api.updateMatchByStudentAndSenior(studentId, seniorId, { match_state: 'declined' })
      .then((result) => {
        let id;
        if (type === 'student') {
          id = seniorId;
        } else if (type === 'senior') {
          id = studentId;
        } else {
          throw `${type} type of match is invalid`;
        }
        dispatch(declineMatch(id));
      });
  };
};
