import { prisma } from '@/prisma/prisma';
import { mapTagToDTO } from '@/types/dtos';
import { publicProcedure, router } from '../init';

export const tagRouter = router({
  list: publicProcedure.query(async () => {
    const tags = await prisma.tag.findMany();
    return tags.map(mapTagToDTO);
  }),
});
