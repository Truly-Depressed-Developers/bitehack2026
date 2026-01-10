import { Prisma } from '@prisma/client';
import { AdspaceDTO, mapAdspaceToDTO } from './adspace';
import { TagDTO, mapTagToDTO } from './tag';

export type BusinessDTO = {
  id: string;
  name: string;
  description: string;
  address: string;
  website?: string;
  nip: string;
  pkd: string;
  imageUrl?: string;
  logoUrl?: string;
  tags: TagDTO[];
  coords: Coordinates;
};

export type BuisinessWithAdspacesDTO = BusinessDTO & {
  adspaces: AdspaceDTO[];
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type BusinessWithTags = Prisma.BusinessGetPayload<{
  include: { tags: true };
}>;

type BusinessWithAdspaces = Prisma.BusinessGetPayload<{
  include: { tags: true; adspaces: { include: { type: true } } };
}>;

export const mapBusinessToDTO = (business: BusinessWithTags): BusinessDTO => ({
  id: business.id,
  name: business.name,
  description: business.description,
  address: business.address,
  website: business.website ?? undefined,
  nip: business.nip,
  pkd: business.pkd,
  imageUrl: business.imageUrl ?? undefined,
  logoUrl: business.logoUrl ?? undefined,
  tags: business.tags.map(mapTagToDTO),
  coords: {
    latitude: business.latitude,
    longitude: business.longitude,
  },
});

export const mapBusinessWithAdspacesToDTO = (
  business: BusinessWithAdspaces,
): BuisinessWithAdspacesDTO => ({
  ...mapBusinessToDTO(business),
  adspaces: business.adspaces.map(mapAdspaceToDTO),
});
