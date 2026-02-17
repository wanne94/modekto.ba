'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const IMAGE_URL = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

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
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blurred background image — always visible */}
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
      <div className="relative z-20 container px-4 md:px-6 text-center text-foreground">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none mb-6 drop-shadow-lg text-white">
          Od Ideje do Projekta <br/> <span className="text-3xl md:text-4xl xl:text-5xl">Za 5 Minuta</span>
        </h1>
        <p className="max-w-[600px] mx-auto text-lg md:text-xl text-slate-200 mb-8 drop-shadow-md">
          Profesionalna idejna rješenja za vikendice – odmah dostupna, odmah preuzimljiva.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90">
            Istraži Kolekciju
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 bg-transparent">
            AI Preporuka <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
