import clsx from 'clsx';
import { ReactNode, forwardRef } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ children, className, id }, ref) => {
    return (
        <section ref={ref} id={id} className={clsx('py-20 md:py-32', className)}>
            {children}
        </section>
    );
});

Section.displayName = 'Section';
