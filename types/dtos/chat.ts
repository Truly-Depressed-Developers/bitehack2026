import { Message, Prisma } from '@prisma/client';
import { AdspaceDTO, mapAdspaceToDTO } from './adspace';
import { UserDTO, mapUserToDTO } from './user';

export type ChatDTO = {
  id: string;
  participants: [UserDTO, UserDTO];
  connectedAdspaces: AdspaceDTO[];
};

export type MessageDTO = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
};

type ChatWithRelations = Prisma.ChatGetPayload<{
  include: {
    participants: true;
    adspaces: { include: { type: true } };
  };
}>;

export const mapChatToDTO = (chat: ChatWithRelations): ChatDTO => {
  if (chat.participants.length !== 2) {
    throw new Error('Chat must have exactly two participants');
  }

  const participants = chat.participants.map(mapUserToDTO) as [UserDTO, UserDTO];

  return {
    id: chat.id,
    participants,
    connectedAdspaces: chat.adspaces.map(mapAdspaceToDTO),
  };
};

export const mapMessageToDTO = (message: Message): MessageDTO => ({
  id: message.id,
  chatId: message.chatId,
  senderId: message.senderId,
  content: message.content,
  timestamp: message.timestamp,
});
