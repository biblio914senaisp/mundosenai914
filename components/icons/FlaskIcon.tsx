
import React from 'react';

const FlaskIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3.535 2.6-6.436 6-6.928V4h2v1.072c3.4.492 6 3.393 6 6.928z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l.01 7" />
  </svg>
);

export default FlaskIcon;
