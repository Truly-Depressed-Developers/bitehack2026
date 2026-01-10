import { prisma } from '@/prisma/prisma';
import { mapChatToDTO } from '@/types/dtos';
import { publicProcedure, router } from '../init';

export const chatRouter = router({
  list: publicProcedure.query(async () => {
    const chats = await prisma.chat.findMany({
      include: {
        participants: true,
        adspaces: {
          include: {
            type: true,
          },
        },
      },
    });

    return chats.map(mapChatToDTO);
  }),
});
