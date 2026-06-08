import { getPasswordStrengthChecks } from '../../utils/getPasswordStrengthChecks';
import './PasswordStrengthIndicator.css';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const checks = getPasswordStrengthChecks(password);

  return (
    <ul className="password-strength" aria-label="Password strength requirements">
      {checks.map((check) => (
        <li
          key={check.id}
          className={
            check.passed
              ? 'password-strength__item password-strength__item--passed'
              : 'password-strength__item'
          }
        >
          {check.label}
        </li>
      ))}
    </ul>
  );
}
