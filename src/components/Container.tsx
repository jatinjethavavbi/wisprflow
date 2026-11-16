import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'default',
}) => {
  const widthClasses = {
    narrow: 'max-w-[54rem]',
    default: 'max-w-[78rem]',
    wide: 'max-w-[90rem]',
  };

  return (
    <div className={`w-full mx-auto px-5 sm:px-8 lg:px-12 ${widthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};
