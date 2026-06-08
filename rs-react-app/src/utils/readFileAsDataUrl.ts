export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }
      reject(new Error('File could not be read.'));
    };
    reader.onerror = () => {
      reject(new Error('File could not be read.'));
    };
    reader.readAsDataURL(file);
  });
}
