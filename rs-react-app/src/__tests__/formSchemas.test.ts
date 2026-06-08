import { describe, expect, it } from 'vitest';
import {
  hasUppercaseFirstLetter,
  isValidEmail,
  rhfFormSchema,
  uncontrolledFormSchema,
} from '../validation/formSchemas';

describe('formSchemas', () => {
  it('validates email without regex', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user@example')).toBe(false);
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('requires an uppercase first letter in the name', () => {
    expect(hasUppercaseFirstLetter('Grace')).toBe(true);
    expect(hasUppercaseFirstLetter('grace')).toBe(false);
  });

  it('rejects negative age values', () => {
    const result = uncontrolledFormSchema.safeParse({
      name: 'Grace',
      age: '-1',
      email: 'grace@example.com',
      gender: 'female',
      acceptTerms: true,
      password: 'Secret1!',
      confirmPassword: 'Secret1!',
      country: 'United States',
      picture: new File(['bytes'], 'photo.png', { type: 'image/png' }),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === 'Age cannot be negative.')).toBe(
        true
      );
    }
  });

  it('rejects invalid image types in the React Hook Form schema', () => {
    const fileList = {
      length: 1,
      item: (index: number) =>
        index === 0
          ? new File(['bytes'], 'photo.gif', { type: 'image/gif' })
          : null,
    };

    const result = rhfFormSchema.safeParse({
      name: 'Grace',
      age: '30',
      email: 'grace@example.com',
      gender: 'female',
      acceptTerms: true,
      password: 'Secret1!',
      confirmPassword: 'Secret1!',
      country: 'United States',
      picture: fileList,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.message === 'Profile picture must be a PNG or JPEG file.'
        )
      ).toBe(true);
    }
  });

  it('rejects mismatched passwords in the uncontrolled schema', () => {
    const result = uncontrolledFormSchema.safeParse({
      name: 'Grace',
      age: '30',
      email: 'grace@example.com',
      gender: 'female',
      acceptTerms: true,
      password: 'Secret1!',
      confirmPassword: 'Other1!',
      country: 'United States',
      picture: new File(['bytes'], 'photo.png', { type: 'image/png' }),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === 'Passwords must match.')).toBe(
        true
      );
    }
  });
});
