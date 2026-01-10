import { Tag } from '@prisma/client';

export type TagDTO = {
  id: string;
  name: string;
};

export const mapTagToDTO = (tag: Tag): TagDTO => ({
  id: tag.id,
  name: tag.name,
});

