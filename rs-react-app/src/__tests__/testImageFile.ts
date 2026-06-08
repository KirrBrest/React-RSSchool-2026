export function createTestImageFile(name = 'profile.png'): File {
  return new File(['image-bytes'], name, { type: 'image/png' });
}
