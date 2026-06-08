export const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_PROFILE_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
] as const;

export type AcceptedProfileImageType =
  (typeof ACCEPTED_PROFILE_IMAGE_TYPES)[number];
