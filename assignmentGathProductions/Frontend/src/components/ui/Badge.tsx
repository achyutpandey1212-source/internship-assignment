import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface BadgeProps extends ButtonHTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning';
  children: ReactNode;
}

function Badge({ variant = 'default', children, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-700',
    warning: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
