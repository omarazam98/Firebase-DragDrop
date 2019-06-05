export const MATCHES_COLLECTION_NAME = 'matches';

export const addMatchToStudent = (
  studentId:string,
  match:MatchType,
):Promise<void> => {
  throw 'Method not implemented';
};

export const fetchMatchByStudentAndId = (
  studentId:string,
  id:string,
):Promise<MatchType> => {
  throw 'Method not implemented';
};

export const fetchMatchesByStudent = (
  studentId:string,
):Promise<MatchType[]> => {
  throw 'Method not implemented';
};

export const updateMatchByStudentAndId = (
  studentId:string,
  id:string,
  updates:object,
):Promise<void> => {
  throw 'Method not implemented';
}