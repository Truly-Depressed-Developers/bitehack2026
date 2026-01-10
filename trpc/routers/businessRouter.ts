import { prisma } from '@/prisma/prisma';
import { mapBusinessWithAdspacesToDTO } from '@/types/dtos';
import { publicProcedure, router } from '../init';
import { z } from 'zod';

export const businessRouter = router({
  list: publicProcedure.query(async () => {
    const businesses = await prisma.business.findMany({
      include: {
        tags: true,
        adspaces: {
          include: {
            type: true,
          },
        },
      },
    });

    return businesses.map(mapBusinessWithAdspacesToDTO);
  }),

  geocode: publicProcedure.input(z.object({ address: z.string() })).query(async ({ input }) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        input.address,
      )}&limit=1`;

      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
          'User-Agent': 'BiteHack2026-App-Krakow-Hackathon (kamilo.p@gmail.com)', // Specific UA
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`Nominatim error status ${response.status}:`, text);
        return [];
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Nominatim returned non-JSON response:', text.substring(0, 200));
        return [];
      }

      const data = await response.json();
      return data as Array<{ lat: string; lon: string; display_name: string }>;
    } catch (error) {
      console.error('TRPC Geocoding error:', error);
      return [];
    }
  }),
});
