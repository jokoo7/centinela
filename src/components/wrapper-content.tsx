import { cn } from '@/lib/utils';
import React from 'react';

export default function WrapperContent({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('mx-auto w-full max-w-5xl px-4', className)} {...props}>
      {children}
    </section>
  );
}
