import { afterEach, describe, expect, it, vi } from 'vitest';
import { MAX_PROFILE_IMAGE_SIZE_BYTES } from '../constants/imageUpload';
import { createSubmissionId } from '../utils/createSubmissionId';
import { getPasswordStrengthChecks } from '../utils/getPasswordStrengthChecks';
import { isGenderValue, parseGenderValue } from '../utils/parseGenderValue';
import { readFileAsDataUrl } from '../utils/readFileAsDataUrl';
import { validateImageFile } from '../utils/validateImageFile';

describe('validation helpers', () => {
  it('evaluates password strength checks', () => {
    const checks = getPasswordStrengthChecks('Secret1!');
    expect(checks.every((check) => check.passed)).toBe(true);
    const weakChecks = getPasswordStrengthChecks('password');
    expect(weakChecks.find((check) => check.id === 'number')?.passed).toBe(false);
    expect(weakChecks.find((check) => check.id === 'uppercase')?.passed).toBe(false);
  });

  it('parses and validates gender values', () => {
    expect(parseGenderValue('female')).toBe('female');
    expect(parseGenderValue('invalid')).toBeNull();
    expect(isGenderValue('male')).toBe(true);
    expect(isGenderValue('unknown')).toBe(false);
  });

  it('validates image type and size', () => {
    expect(validateImageFile(null)).toEqual({
      valid: false,
      message: 'Profile picture is required.',
    });

    expect(
      validateImageFile(new File(['bytes'], 'photo.gif', { type: 'image/gif' }))
    ).toEqual({
      valid: false,
      message: 'Profile picture must be a PNG or JPEG file.',
    });

    const oversizedFile = new File(
      [new Uint8Array(MAX_PROFILE_IMAGE_SIZE_BYTES + 1)],
      'large.png',
      { type: 'image/png' }
    );
    expect(validateImageFile(oversizedFile)).toEqual({
      valid: false,
      message: 'Profile picture must be 5 MB or smaller.',
    });

    expect(
      validateImageFile(new File(['bytes'], 'photo.png', { type: 'image/png' }))
        .valid
    ).toBe(true);
  });

  it('converts a file to a data url', async () => {
    class MockFileReader {
      public result: string | ArrayBuffer | null = 'data:image/png;base64,abc';

      public onload: (() => void) | null = null;

      public onerror: (() => void) | null = null;

      public readAsDataURL(): void {
        this.onload?.();
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    await expect(
      readFileAsDataUrl(new File(['bytes'], 'photo.png', { type: 'image/png' }))
    ).resolves.toBe('data:image/png;base64,abc');

    vi.unstubAllGlobals();
  });

  it('rejects files that cannot be converted to a data url', async () => {
    class BrokenFileReader {
      public result: ArrayBuffer | null = new ArrayBuffer(8);

      public onload: (() => void) | null = null;

      public onerror: (() => void) | null = null;

      public readAsDataURL(): void {
        this.onload?.();
      }
    }

    vi.stubGlobal('FileReader', BrokenFileReader);

    await expect(
      readFileAsDataUrl(new File(['bytes'], 'photo.png', { type: 'image/png' }))
    ).rejects.toThrow('File could not be read.');

    vi.unstubAllGlobals();
  });

  it('rejects files when FileReader fails', async () => {
    class FailingFileReader {
      public onload: (() => void) | null = null;

      public onerror: (() => void) | null = null;

      public readAsDataURL(): void {
        this.onerror?.();
      }
    }

    vi.stubGlobal('FileReader', FailingFileReader);

    await expect(
      readFileAsDataUrl(new File(['bytes'], 'photo.png', { type: 'image/png' }))
    ).rejects.toThrow('File could not be read.');

    vi.unstubAllGlobals();
  });

  it('creates submission ids', () => {
    expect(createSubmissionId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  it('falls back when crypto.randomUUID is unavailable', () => {
    const originalCrypto = globalThis.crypto;
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: {},
    });

    expect(createSubmissionId()).toMatch(/^submission-\d+$/);

    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: originalCrypto,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
});
