import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 center'>
            <Tilt className='Tilt br2 shadow-2' options={{ max : 50 }} style={{ height: 120, width: 120 }} >
                <div className='Tilt-inner pa1'>  
                    <img alt='Face Recognition Logo' src={logo} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;