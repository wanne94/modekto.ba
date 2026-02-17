export interface CheckoutBasket {
  projectId: string;
  upsellIds: string[];
  crossSellIds: string[];
}

const KEY = 'modekto_checkout';

export function saveCheckoutBasket(basket: CheckoutBasket): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(basket));
}

export function loadCheckoutBasket(): CheckoutBasket | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutBasket;
  } catch {
    return null;
  }
}

export function clearCheckoutBasket(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
