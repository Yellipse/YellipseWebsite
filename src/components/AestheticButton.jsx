import React from 'react';
import './AestheticButton.css';

const AestheticButton = ({ children, onClick, className = '' }) => {
    return (
        <button className={`aesthetic-button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default AestheticButton;
