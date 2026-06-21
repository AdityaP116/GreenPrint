import React from 'react';

const Card = ({ children, className = '', insight = false, hover = false }) => {
  const baseClass = insight ? 'card-insight' : 'card';
  const hoverClass = hover ? 'card-hover' : '';

  return (
    <div className={`${baseClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
