import clsx from 'clsx';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("mx-auto max-w-3xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
