import {
  ACCEPTED_PROFILE_IMAGE_TYPES,
  MAX_PROFILE_IMAGE_SIZE_BYTES,
} from '../constants/imageUpload';

type ImageValidationResult =
  | { valid: true }
  | { valid: false; message: string };

function isAcceptedImageType(type: string): boolean {
  return ACCEPTED_PROFILE_IMAGE_TYPES.some(
    (acceptedType) => acceptedType === type
  );
}

export function validateImageFile(file: File | null): ImageValidationResult {
  if (file === null) {
    return { valid: false, message: 'Profile picture is required.' };
  }
  if (!isAcceptedImageType(file.type)) {
    return {
      valid: false,
      message: 'Profile picture must be a PNG or JPEG file.',
    };
  }
  if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      message: 'Profile picture must be 5 MB or smaller.',
    };
  }
  return { valid: true };
}
