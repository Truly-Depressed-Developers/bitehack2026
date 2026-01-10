'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { TRPCProvider } from './TRPCProvider';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TRPCProvider>
        <SessionProvider>{children}</SessionProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}
