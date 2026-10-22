import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format ISO date string to local readable */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

/** Generate a random hex color */
export function randomColor(): string {
  const colors = [
    '#F87171', '#FB923C', '#FBBF24', '#34D399',
    '#60A5FA', '#A78BFA', '#F472B6', '#38BDF8',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/** Copy text to clipboard */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Build share URL from shareCode */
export function buildShareUrl(shareCode: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/join/${shareCode}`;
}
