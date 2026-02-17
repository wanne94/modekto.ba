'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Props {
  basePrice: number;
  projectTitle?: string;
  projectId: string;
}

export function CheckoutSection({ basePrice, projectId }: Props) {
  return (
    <div className="space-y-4 border-t pt-4 mt-2">
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">Cijena od</span>
        <span className="text-2xl font-extrabold text-primary">{formatPrice(basePrice)}</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <Link
          href={`/checkout/${projectId}`}
          className="w-full flex items-center justify-center gap-2 text-base font-semibold px-6 py-3 rounded-lg bg-orange-500 hover:bg-green-500 text-white transition-colors duration-200"
        >
          <ShoppingCart size={18} />
          Kupi Projekat
        </Link>
        <span className="text-xs text-muted-foreground">(Idejno rješenje)</span>
      </div>
    </div>
  );
}
