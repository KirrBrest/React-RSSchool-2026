export type PasswordStrengthCheck = {
  id: 'number' | 'uppercase' | 'lowercase' | 'special';
  label: string;
  passed: boolean;
};

export function getPasswordStrengthChecks(
  password: string
): PasswordStrengthCheck[] {
  return [
    {
      id: 'number',
      label: '1 number',
      passed: /\d/.test(password),
    },
    {
      id: 'uppercase',
      label: '1 uppercase letter',
      passed: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: '1 lowercase letter',
      passed: /[a-z]/.test(password),
    },
    {
      id: 'special',
      label: '1 special character',
      passed: /[^A-Za-z0-9]/.test(password),
    },
  ];
}
