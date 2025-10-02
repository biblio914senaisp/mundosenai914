
import React from 'react';

const TrophyIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6.5a2.5 2.5 0 012.5-2.5h1A2.5 2.5 0 0115 6.5V19m-6 0h6m-3-6.5a1 1 0 110-2 1 1 0 010 2zM3 13.5a1 1 0 112 0 1 1 0 01-2 0zm16 0a1 1 0 112 0 1 1 0 01-2 0z" />
    </svg>
);

export default TrophyIcon;
