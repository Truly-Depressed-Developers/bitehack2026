'use client';

import { trpc } from '@/trpc/client';

export default function ExampleData() {
  const { data, isLoading, error } = trpc.example.getExampleData.useQuery();

  if (isLoading) return <div>Loading example data…</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <strong>Example data:</strong>
      <div>{data}</div>
    </div>
  );
}
