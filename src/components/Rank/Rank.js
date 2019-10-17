import React from 'react';

const Rank = ({name, submitedPhotos}) => {
    return (
        <div>
           <div className='white f3'>
               {`${name}, so far you submited...`}
           </div>
           <div className='white f1'>
               {`${submitedPhotos} photos`}
           </div>
        </div>
    );
}

export default Rank;