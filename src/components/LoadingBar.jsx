import React from 'react';

function LoadingBar({ progress }) {
    return (
        <div className="loading-bar">
            <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
    );
}

export default LoadingBar;