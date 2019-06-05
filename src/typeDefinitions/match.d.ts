type MatchType = {
  id: string;
  name: string;
  tasks: any[];
  rent: number;
  match_state: string;
};

type MatchesActionType =
  { type: '@@INIT' }
  | { type: 'DECLINE_MATCH'; id: string; }
  | { type: 'ACCEPT_MATCH'; id: string; }
  | { type: 'SET_MATCHES'; matches: MatchType[]; };