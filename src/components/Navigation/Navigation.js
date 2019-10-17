import React from 'react';

const Navigation = ({ onRouteChange, isUserSignedIn }) => {
    if (isUserSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    className='f3 link dim black underline pa3 pointer' 
                    onClick={() => onRouteChange('signout')}
                > Sign Out </p>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    className='f3 link dim black underline pa3 pointer' 
                    onClick={() => onRouteChange('home')}
                >Sign In</p>
                <p 
                    className='f3 link dim black underline pa3 pointer' 
                    onClick={() => onRouteChange('register')}
                >Register</p>
            </nav>
        );
    }
}

export default Navigation;