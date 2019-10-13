import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='I am still waiting on you...' width='500' height='auto' src={imageUrl} />
            </div>
        </div>
    );
}

export default FaceRecognition;