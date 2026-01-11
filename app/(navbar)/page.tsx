'use client';

import { ComponentExample } from '@/components/component-example';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  const isSignedIn = status === 'authenticated' && !!session?.user;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-muted-foreground">Ładowanie...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Bitehack</h1>
          <p className="text-lg text-muted-foreground">Zaloguj się, aby kontynuować</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/auth/signin">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Zaloguj się
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" className="w-full sm:w-auto">
              Zarejestruj się
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1>Home</h1>
      <ComponentExample />
    </main>
  );
}
