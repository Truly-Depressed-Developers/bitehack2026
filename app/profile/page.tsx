'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isSignedIn = status === 'authenticated' && !!session?.user;

  return (
    <div>
      <h1>Twoje biznesy</h1>
      <Link href="/profile/create-business">Dodaj biznes</Link>
      <br />
      <Link href="/test-data">test-data</Link>
      <br />

      {session && (
        <div className="mt-4 flex items-center gap-2">
          Zalogowany użytkownik:
          <span className="text-sm text-muted-foreground">
            {session.user.firstName} {session.user.lastName}
          </span>
          <Button variant="destructive" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
