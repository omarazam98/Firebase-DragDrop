export const seniorMatches:SeniorMatchType[] = [
  {
    person_id: 'match_senior_1',
    name: 'Earnie MacDougal',
    tasks: [],
    rent: 500,
    match_state: 'pending',
    bio: 'This is a test bio',
    location: 'Carleton Area',
    photo: 'photo_placeholder',
  },
  {
    person_id: 'match_senior_2',
    name: 'Arnold Palmer',
    tasks: ['cooking', 'cleaning', 'garbage'],
    rent: 300,
    match_state: 'accepted',
    bio: 'This is another test bio',
    location: 'Yorkville',
    photo: 'photo_placeholder',
  },
  {
    person_id: 'match_senior_3',
    name: 'Beatrice Bourbon',
    tasks: ['bathroom', 'vaccuum'],
    rent: 400,
    match_state: 'rejected',
    bio: 'This is another test bio',
    location: 'Kempville',
    photo: 'photo_placeholder',
  },
];

export const studentMatches:StudentMatchType[] = [
  {
    person_id: 'match_student_1',
    name: 'John Douglas',
    tasks: [],
    match_state: 'pending',
    bio: 'This is a test bio',
    location: 'Carleton Area',
    photo: 'photo_placeholder',
    school: 'Carleton',
    program: 'Engineering',
  },
  {
    person_id: 'match_student_2',
    name: 'Dwayne Wade',
    tasks: ['cooking', 'cleaning', 'garbage'],
    match_state: 'accepted',
    bio: 'This is another test bio',
    location: 'Yorkville',
    photo: 'photo_placeholder',
    school: 'York',
    program: 'Journalism',
  },
  {
    person_id: 'match_student_3',
    name: 'Dexter Morgan',
    tasks: ['bathroom', 'vaccuum'],
    match_state: 'rejected',
    bio: 'This is another test bio',
    location: 'Kempville',
    photo: 'photo_placeholder',
    school: 'Kemp',
    program: 'Farming',
  },
];

export default seniorMatches;
