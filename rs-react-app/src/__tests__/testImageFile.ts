export function createTestImageFile(name = 'avatar.png'): File {
  return new File(['image-bytes'], name, { type: 'image/png' });
}
