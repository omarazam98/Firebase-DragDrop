type MatchType =
  StudentMatchType
  | SeniorMatchType;

type StudentMatchType = {
  person_id: string;
  name: string;
  tasks: any[];
  bio: string;
  location: string;
  photo: string;
  match_state: 'pending' | 'accepted' | 'rejected';
  school: string;
  program: string;
};

type SeniorMatchType = {
  person_id: string;
  name: string;
  tasks: any[];
  bio: string;
  location: string;
  photo: string;
  match_state: 'pending' | 'accepted' | 'rejected';
  rent: number;
};

type MatchesActionType =
  { type: '@@INIT' }
  | { type: 'DECLINE_MATCH'; id: string; }
  | { type: 'ACCEPT_MATCH'; id: string; }
  | { type: 'SET_MATCHES'; matches: MatchType[]; };
