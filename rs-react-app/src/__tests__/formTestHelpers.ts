import { screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { createTestImageFile } from './testImageFile';

type BasicFormFieldOptions = {
  name?: string;
  age?: string;
  email?: string;
  gender: 'male' | 'female' | 'other';
  country?: string;
  acceptTerms?: boolean;
};

export async function fillBasicFormFields(
  user: UserEvent,
  options: BasicFormFieldOptions
): Promise<void> {
  await user.type(
    screen.getByLabelText('Name'),
    options.name ?? 'Grace Hopper'
  );
  await user.type(screen.getByLabelText('Age'), options.age ?? '45');
  await user.type(
    screen.getByLabelText('Email'),
    options.email ?? 'grace@example.com'
  );
  await user.selectOptions(screen.getByLabelText('Gender'), options.gender);
  if (options.acceptTerms !== false) {
    await user.click(screen.getByLabelText('I accept the Terms and Conditions'));
  }
}

export async function fillAdvancedFormFields(user: UserEvent): Promise<void> {
  await user.type(screen.getByLabelText('Password'), 'Secret1!');
  await user.type(screen.getByLabelText('Confirm password'), 'Secret1!');
  await user.type(screen.getByLabelText('Country'), 'United States');
  await user.upload(
    screen.getByLabelText('Profile picture'),
    createTestImageFile()
  );
}
