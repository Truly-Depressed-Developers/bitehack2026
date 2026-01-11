import { Navbar } from '@/components/Navbar';

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Navbar />
      <div className="h-20 md:h-0" />
    </>
  );
}
