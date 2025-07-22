import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        'border-2 border-primary border-t-transparent rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className,
  lines = 1 
}) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-gray-200 rounded',
            index === lines - 1 ? 'w-3/4' : 'w-full',
            lines > 1 ? 'h-4 mb-2' : 'h-4'
          )}
        />
      ))}
    </div>
  );
};

interface LoadingCardProps {
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => {
  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-lg animate-pulse', className)}>
      {/* Image placeholder */}
      <div className="bg-gray-200 rounded-lg h-48 mb-4" />
      
      {/* Title placeholder */}
      <div className="bg-gray-200 rounded h-6 mb-3" />
      
      {/* Description placeholder */}
      <div className="space-y-2 mb-4">
        <div className="bg-gray-200 rounded h-4" />
        <div className="bg-gray-200 rounded h-4 w-3/4" />
      </div>
      
      {/* Button placeholder */}
      <div className="bg-gray-200 rounded-full h-10 w-32" />
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  className,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-anoohe-dark font-body font-medium">{message}</p>
      </div>
    </div>
  );
};

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  className,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-body font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
};
