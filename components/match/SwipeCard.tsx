'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeatureBadge } from '@/components/map/FeatureBadge';
import { MapPinIcon, TagIcon } from '@phosphor-icons/react';
import { SwipeCardBusinessDTO } from '@/types/dtos/match';


type SwipeCardProps = {
  business: SwipeCardBusinessDTO;
};

export function SwipeCard({ business }: SwipeCardProps) {
  const featuredAdspace = business.adspaces[0];

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative h-64 w-full bg-muted">
        <Image
          src={featuredAdspace?.imageUrl || business.imageUrl || 'https://placehold.co/400x300'}
          alt={business.name}
          fill
          className="object-cover"
        />
        {business.logoUrl && (
          <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full border-2 border-white overflow-hidden bg-white">
            <Image
              src={business.logoUrl}
              alt={`${business.name} logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-medium">{business.name}</h2>

        <div className="flex items-center gap-2 text-base text-muted-foreground">
          <MapPinIcon size={16} />
          <span>{business.address}</span>
        </div>

        <p className="text-base leading-relaxed line-clamp-2">{business.description}</p>

        {business.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {business.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="gap-1">
                <TagIcon size={12} />
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {featuredAdspace && (
          <div className="border-t pt-3 mt-3">
            <h3 className="text-base font-medium mb-2">Dostępna przestrzeń:</h3>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{featuredAdspace.name}</span>
              <div className="flex gap-1">
                <FeatureBadge label="Barter" active={featuredAdspace.isBarterAvailable} />
                <FeatureBadge label="Sprzedaż" active={featuredAdspace.pricePerWeek !== null} />
              </div>
            </div>
            <div className="text-base text-muted-foreground">
              {featuredAdspace.maxWidth} x {featuredAdspace.maxHeight} cm
              {featuredAdspace.pricePerWeek && (
                <span className="ml-2 font-medium text-foreground">
                  {featuredAdspace.pricePerWeek}zł / tyg
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
