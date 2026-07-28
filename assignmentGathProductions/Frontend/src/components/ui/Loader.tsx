interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-gray-900`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default Loader;
