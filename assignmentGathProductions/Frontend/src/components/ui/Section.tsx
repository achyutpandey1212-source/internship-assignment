import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

function Section({ children, className = '', spacing = 'lg' }: SectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-20',
  };

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}

export default Section;
