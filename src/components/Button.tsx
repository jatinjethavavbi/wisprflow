import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-body font-semibold leading-none rounded-[0.5rem] border-2 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 active:translate-y-[1px]';

  const variantStyles = {
    primary:
      'bg-[#f0d7ff] border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#e5c2ff] hover:-translate-y-0.5 shadow-[0_2px_0_#1a1a1a]',
    secondary:
      'bg-[#ffffeb] border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#e4e4d0] hover:-translate-y-0.5',
    dark:
      'bg-[#1a1a1a] border-[#1a1a1a] text-[#ffffeb] hover:bg-[#2c2c2c] hover:-translate-y-0.5',
    ghost:
      'bg-transparent border-transparent text-[#1a1a1a] hover:bg-[#e4e4d0]/60',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-3 text-[0.95rem]',
    lg: 'px-6 py-4 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
