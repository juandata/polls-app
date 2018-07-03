import React from 'react';

import ThumbnailHOC from './ThumbnailHOC';
 export default function ShowUserPolls(props) {
   console.log(props.polls, props.pollsInfo)
     return (
    < ThumbnailHOC polls={props.polls} pollsPerRow={4} pollsInfo={props.pollsInfo}/>
     );
   }
