import { createElement } from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    width,
    height,
  }: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
  }) =>
    createElement('img', {
      src,
      alt,
      className,
      width,
      height,
    }),
}));
