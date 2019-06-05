import { fetchMatchesByStudent, updateMatchByStudentAndId } from '../api/matches';

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
