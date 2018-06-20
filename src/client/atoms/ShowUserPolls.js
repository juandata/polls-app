import React from 'react';

import {ThumbnailHOC} from './ThumbnailHOC';
 export default function ShowUserPolls(props) {
     return (
    < ThumbnailHOC polls={12} pollsPerRow={3}/>
     );
   }
