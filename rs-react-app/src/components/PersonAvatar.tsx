'use client';

import Image from 'next/image';
import { getPersonAvatarUrl } from '../utils/personAvatarUrl';

type PersonAvatarProps = {
  name: string;
  dicebearSize: number;
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function PersonAvatar({
  name,
  dicebearSize,
  width,
  height,
  alt,
  className,
  priority,
  sizes,
}: PersonAvatarProps) {
  return (
    <Image
      className={className}
      src={getPersonAvatarUrl(name, dicebearSize)}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}
