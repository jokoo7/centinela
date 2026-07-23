import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | number) {
  const parseDate = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (isNaN(parseDate.getTime())) {
    return '-';
  }

  const formatted = format(parseDate, "d MMMM yyyy 'pukul' HH:mm", {
    locale: id,
  });

  // return format dari 08:30 -> 08.30
  return formatted.replace(/(\d{2}):(\d{2})$/, '$1.$2');
}

export function formatRelativeDate(
  date: string | Date | number,
  options?: { fallbackAfterDays?: number },
): string {
  const fallbackAfterDays = options?.fallbackAfterDays ?? 30;

  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return '-';
  }

  const diffMs = Date.now() - parsedDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (fallbackAfterDays > 0 && diffDays > fallbackAfterDays) {
    return formatDate(parsedDate);
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: id });
}
