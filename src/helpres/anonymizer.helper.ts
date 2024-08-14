import * as crypto from 'node:crypto';

export const generateAnonymizedValue = (
  input: string | undefined
): string | null => {
  if (!input) return null;

  const hash = crypto.createHash('sha256').update(input).digest('hex');
  const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let anonymized = '';

  for (let i = 0; i < 8; i++) {
    anonymized +=
      base[parseInt(hash.substring(i * 2, i * 2 + 2), 16) % base.length];
  }

  return anonymized;
};
