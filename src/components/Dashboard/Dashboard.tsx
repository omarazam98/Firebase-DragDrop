import React from 'react';
import { withAPI } from '@winwin/api-firebase';
import withAuth from '../Authorization/Authorization';

export const Dashboard = (props) => {
  return <div>
      <h1>Dashboard</h1>
      <h4>All Page content follows</h4>
      <p>Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          Westward from the Davis Strait 'tis there 'twas said to lie
          The sea route to the Orient for which so many died;
          Seeking gold and glory, leaving weathered, broken bones
          And a long-forgotten lonely cairn of stones.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          Three centuries thereafter, I take passage overland
          In the footsteps of brave Kelso, where his "sea of flowers" began
          Watching cities rise before me, then behind me sink again
          This tardiest explorer, driving hard across the plain.
          And through the night, behind the wheel, the mileage clicking west
          I think upon Mackenzie, David Thompson and the rest
          Who cracked the mountain ramparts and did show a path for me
          To race the roaring Fraser to the sea.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          How then am I so different from the first men through this way?
          Like them, I left a settled life, I threw it all away.
          To seek a Northwest Passage at the call of many men
          To find there but the road back home again.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.</p>
      <p>Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          Westward from the Davis Strait 'tis there 'twas said to lie
          The sea route to the Orient for which so many died;
          Seeking gold and glory, leaving weathered, broken bones
          And a long-forgotten lonely cairn of stones.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          Three centuries thereafter, I take passage overland
          In the footsteps of brave Kelso, where his "sea of flowers" began
          Watching cities rise before me, then behind me sink again
          This tardiest explorer, driving hard across the plain.
          And through the night, behind the wheel, the mileage clicking west
          I think upon Mackenzie, David Thompson and the rest
          Who cracked the mountain ramparts and did show a path for me
          To race the roaring Fraser to the sea.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.
          How then am I so different from the first men through this way?
          Like them, I left a settled life, I threw it all away.
          To seek a Northwest Passage at the call of many men
          To find there but the road back home again.
          Ah, for just one time I would take the Northwest Passage
          To find the hand of Franklin reaching for the Beaufort Sea;
          Tracing one warm line through a land so wild and savage
          And make a Northwest Passage to the sea.</p>
  </div>;
};

export default withAPI(withAuth(Dashboard));
