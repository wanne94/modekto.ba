'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArchitectureStyle } from '../types';
import { MOCK_HOUSES } from '../lib/projects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BedDouble, Bath, Ruler, ShoppingCart, UtensilsCrossed, Utensils, Umbrella, Eye } from 'lucide-react';

export const ListingGrid: React.FC = () => {
  const [filter, setFilter] = useState<ArchitectureStyle>('Sve');

  const filteredHouses = filter === 'Sve'
    ? MOCK_HOUSES
    : MOCK_HOUSES.filter(house => house.category === filter);

  return (
    <section id="kolekcija" className="py-16 container px-4 md:px-6 mx-auto">
      <div className="flex flex-col items-center mb-10 space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Naša Kolekcija</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Pregledajte naše najpopularnije projekte. Filtrirajte prema stilu koji vam najviše odgovara.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {(['Sve', 'Moderni', 'Alpski', 'Mediteranski', 'Mala Kuća'] as ArchitectureStyle[]).map((style) => (
            <Button
              key={style}
              variant={filter === style ? 'default' : 'outline'}
              onClick={() => setFilter(style)}
              className="rounded-full"
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((house) => (
          <Link key={house.id} href={`/projekat/${house.id}`} className="block">
            <Card className="overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 h-full">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={house.imageUrl}
                  alt={house.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                {house.featured && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-none">
                    Izdvojeno
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-2 left-2 backdrop-blur-md bg-background/70">
                  {house.category}
                </Badge>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/30 text-2xl font-bold tracking-widest uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    MODEKTO.BA
                  </span>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{house.title}</CardTitle>
                  <div className="font-bold text-lg text-primary">{house.price} €</div>
                </div>
                <CardDescription className="line-clamp-2">{house.description}</CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-2 flex-grow">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Ruler size={15} className="shrink-0" />
                    <span>{house.sqMeters} m² površina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble size={15} className="shrink-0" />
                    <span>{house.bedrooms} {house.bedrooms === 1 ? 'soba' : 'sobe'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={15} className="shrink-0" />
                    <span>{house.bathrooms} {house.bathrooms === 1 ? 'kupaonica' : 'kupaonice'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {house.kitchen ? <Utensils size={15} className="shrink-0" /> : <UtensilsCrossed size={15} className="shrink-0" />}
                    <span>{house.kitchen ? 'Kuhinja' : 'Bez kuhinje'}</span>
                  </div>
                  {house.terraceArea && (
                    <div className="flex items-center gap-2 col-span-2">
                      <Umbrella size={15} className="shrink-0" />
                      <span>Terasa {house.terraceArea} m²</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Eye size={16} />
                  Pogledaj Projekat
                </Button>
                <Button className="flex-1 gap-2" onClick={(e) => e.stopPropagation()}>
                  <ShoppingCart size={16} />
                  Naruči Projekt
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
