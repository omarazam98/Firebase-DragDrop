// The initial state of the matches is an empty array
const matchesReducersDefaultState: MatchType[] = [];

// The matches reducer defines all the actions that can be taken on the
// matches section of the redux store and what those actions do
export const matchesReducer = (
    state:MatchType[] = matchesReducersDefaultState,
    action:MatchesActionType,
    ):MatchType[] => {
  switch (action.type){
    case 'ACCEPT_MATCH':
      return changeMatchStateByPersonId(state, action.id, 'accepted');
    case 'DECLINE_MATCH':
      return changeMatchStateByPersonId(state, action.id, 'rejected');
    case 'SET_MATCHES':
      return action.matches;
    default:
      return state;
  }
};

// Helper method that changes the match_state field of a specific match
const changeMatchStateByPersonId = (
  matches:MatchType[],
  personId:string,
  matchState: 'accepted' | 'rejected' | 'pending',
):MatchType[] => {
  let matchFound = false;
  const newMatches:MatchType[] = matches.map((match:MatchType) => {
    if (match.person_id === personId) {
      matchFound = true;
      return {
        ...match,
        match_state: matchState,
      };
    }
    return match;
  });

  if (!matchFound) {
    throw 'Person ID does not exist as a match';
  }
  return newMatches;
};

export default matchesReducer;
