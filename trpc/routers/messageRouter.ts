import { prisma } from '@/prisma/prisma';
import { mapMessageToDTO } from '@/types/dtos';
import { z } from 'zod';
import { publicProcedure, router } from '../init';

export const messageRouter = router({
  byChat: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const messages = await prisma.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { timestamp: 'asc' },
      });

      return messages.map(mapMessageToDTO);
    }),
});
