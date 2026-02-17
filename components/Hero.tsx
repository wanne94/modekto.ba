'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, BedDouble, Bath, Ruler, Utensils, Umbrella, Eye } from 'lucide-react';
import { MOCK_HOUSES } from '@/lib/projects';
import { formatPrice } from '@/lib/utils';

const IMAGE_URL = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop";

const FEATURED_IDS = ['1', '7', '19'];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const featuredHouses = FEATURED_IDS
    .map(id => MOCK_HOUSES.find(h => h.id === id))
    .filter(Boolean) as typeof MOCK_HOUSES;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const sharpMask = mousePos
    ? `radial-gradient(circle 130px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`
    : `radial-gradient(circle 0px at center, black 0%, transparent 0%)`;

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col overflow-visible cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero pozadina */}
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Blurred background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGE_URL}
            alt="Modern House Architecture"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ filter: 'blur(10px)', transform: 'scale(1.05)' }}
          />
        </div>

        {/* Sharp image — revealed by brush mask on desktop */}
        <div
          className="absolute inset-0 z-0 hidden md:block"
          style={{
            WebkitMaskImage: sharpMask,
            maskImage: sharpMask,
          }}
        >
          <Image
            src={IMAGE_URL}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-background/50" />

        {/* Content */}
        <div className="relative z-20 container px-4 md:px-6 text-center text-foreground pb-28">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none mb-6 drop-shadow-lg text-white">
            <span className="flex flex-col items-center gap-1">
              <span>Od Ideje do Projekta</span>
              <span className="w-72 h-px bg-white/40 my-4"></span>
              <span className="px-4 py-1.5 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white shadow-lg">Za 5 Minuta</span>
            </span>
          </h1>
          <p className="max-w-[600px] mx-auto text-lg md:text-xl text-slate-200 mb-8 drop-shadow-md">
            Profesionalna idejna rješenja za vikendice – odmah dostupna, odmah moguće preuzeti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90">
              Pogledaj projekte
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 bg-transparent"
              onClick={() => document.getElementById('ai-preporuka')?.scrollIntoView({ behavior: 'smooth' })}
            >
              AI Preporuka <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Izdvojene kartice koje izlaze iz hero sekcije */}
      <div className="relative z-30 w-full -mt-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHouses.map((house) => (
              <Card key={house.id} className="overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={house.imageUrl}
                    alt={house.title}
                    className="object-cover w-full h-full"
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
                    <div className="font-bold text-lg text-primary">{formatPrice(house.price)}</div>
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
                      <Utensils size={15} className="shrink-0" />
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

                <CardFooter className="p-4 pt-0">
                  <Link href={`/projekat/${house.id}`} className="w-full flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-sm rounded-md px-4 py-2 text-sm font-medium">
                    <Eye size={16} className="shrink-0" />
                    Pogledaj Projekat
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
