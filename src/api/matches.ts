export const MATCHES_COLLECTION_NAME = 'matches';

export const addMatchToStudent = (
  studentId:string,
  match:MatchType,
):Promise<void> => {
  throw 'Method not implemented';
};

export const fetchSeniorMatchByStudentAndSenior = (
  studentId:string,
  seniorId:string,
):Promise<MatchType> => {
  throw 'Method not implemented';
};

export const fetchStudentMatchByStudentAndSenior = (
  studentId:string,
  seniorId:string,
):Promise<MatchType> => {
  throw 'Method not implemented'
};

export const fetchMatchesByStudent = (
  studentId:string,
):Promise<MatchType[]> => {
  throw 'Method not implemented';
};

export const fetchMatchesBySenior = (
  studentId:string,
):Promise<MatchType[]> => {
  throw 'Method not implemented';
};

export const updateMatchByStudentAndSenior = (
  studentId:string,
  id:string,
  updates:object,
):Promise<void> => {
  throw 'Method not implemented';
}