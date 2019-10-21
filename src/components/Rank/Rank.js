import React from 'react';

const Rank = ({name, submittedPhotos}) => {
    return (
        <div>
           <div className='white f3'>
               {`${name}, so far you submited...`}
           </div>
           <div className='white f1'>
               {`${submittedPhotos} photos`}
           </div>
        </div>
    );
}

export default Rank;