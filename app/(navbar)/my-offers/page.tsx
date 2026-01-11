import Link from 'next/link';

export default function MyOffers() {
  return (
    <div>
      <h1>Moje ogłoszenia</h1>
      <Link href="/my-offers/create-offer">Dodaj nowe ogłoszenie</Link>
    </div>
  );
}
