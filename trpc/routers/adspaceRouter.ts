import { prisma } from '@/prisma/prisma';
import { mapAdspaceWithBusinessToDTO, mapAdspaceTypeToDTO } from '@/types/dtos';
import { publicProcedure, router } from '../init';

export const adspaceRouter = router({
  list: publicProcedure.query(async () => {
    const adspaces = await prisma.adspace.findMany({
      include: {
        type: true,
        business: {
          include: {
            tags: true,
          },
        },
      },
    });

    return adspaces.map(mapAdspaceWithBusinessToDTO);
  }),
  types: publicProcedure.query(async () => {
    const types = await prisma.adspaceType.findMany();
    
    return types.map(mapAdspaceTypeToDTO);
  }),
});
