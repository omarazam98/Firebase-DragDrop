// This defines the fields that can be contained by match interface
// This is defined within the reducers file as it is the only place where it is used
// In the future all typedefintions may be moved to the typedefs folder as .d.ts files
type Action =
  | { type: 'DECLINE_MATCH'; id: string; }
  | { type: 'ACCEPT_MATCH'; id: string; }
  | { type: 'SET_MATCHES'; matches: MatchType[]; };

// The initial state of the matches is an empty array
const matchesReducersDefaultState: MatchType[] = [];

// The matches reducer defines all the actions that can be taken on the
// matches section of the redux store and what those actions do
export const matchesReducer = (
    state:MatchType[] = matchesReducersDefaultState,
    action:Action,
    ) => {
  switch (action.type){
    case 'ACCEPT_MATCH':
      return changeMatchStateById(state, action.id, 'accepted');
    case 'DECLINE_MATCH':
      return changeMatchStateById(state, action.id, 'rejected');
    case 'SET_MATCHES':
      return action.matches;
    default:
      return state;
  }
};

// Helper method that changes the match_state field of a specific match
const changeMatchStateById = (matches:MatchType[], id:string, matchState:string) => {
  return matches.map((match:MatchType) => {
    if (match.id === id) {
      return {
        ...match,
        match_state: matchState,
      };
    }
    return match;
  });
};

export default matchesReducer;
