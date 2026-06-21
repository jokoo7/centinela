import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Button>Login</Button>
        <p className="text-destructive">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quasi?
        </p>
      </div>
    </div>
  );
}
