'use client';

import { trpc } from '@/trpc/client';
import { SettingsItem } from '@/components/settings/SettingsItem';
import {
  BuildingsIcon,
  CurrencyDollarSimpleIcon,
  GearIcon,
  StarIcon,
  SunIcon,
} from '@phosphor-icons/react';

export default function ProfilePage() {
  const { data: business } = trpc.business.mine.useQuery();

  const settingsOptions = [
    {
      label: 'Twój biznes',
      icon: BuildingsIcon,
      href: business ? '/profile/business' : 'profile/create-business',
    },
    {
      label: 'Reputacja',
      icon: StarIcon,
      href: '/profile/reputation',
    },
    {
      label: 'Twój plan',
      icon: CurrencyDollarSimpleIcon,
      href: '/profile/plan',
    },
    {
      label: 'Motyw aplikacji',
      icon: SunIcon,
      href: '/profile/theme',
    },
    {
      label: 'Ustawienia konta',
      icon: GearIcon,
      href: '/profile/settings',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background p-4">
      <header className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold">Mój Profil</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {settingsOptions.map((option, index) => (
            <SettingsItem key={index} icon={option.icon} label={option.label} href={option.href} />
          ))}
        </div>
      </main>
    </div>
  );
}
