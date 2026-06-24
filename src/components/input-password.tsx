import React, { useState } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const InputPassword = ({ className, ...props }: React.ComponentProps<typeof Input>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        className={cn('pr-10 [&::-ms-reveal]:hidden', className)}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
      </button>
    </div>
  );
};
