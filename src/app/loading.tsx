import { LoaderIcon } from 'lucide-react';

export default function loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderIcon role="status" aria-label="Loading" className="size-4 animate-spin" />
    </div>
  );
}
