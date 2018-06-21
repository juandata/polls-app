import React from 'react';

import ThumbnailHOC from './ThumbnailHOC';
 export default function ShowUserPolls(props) {
     return (
    < ThumbnailHOC polls={props.polls} pollsPerRow={3} pollsInfo={props.pollsInfo}/>
     );
   }
