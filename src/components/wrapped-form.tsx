import { UserRoundKey } from 'lucide-react';
import React from 'react';

type CenteredFormLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CenteredFormLayout({
  title,
  description,
  children,
}: CenteredFormLayoutProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-8 items-center justify-center rounded-md">
          <UserRoundKey className="size-6" />
        </div>
        <div className="mb-4 flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-balance text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
