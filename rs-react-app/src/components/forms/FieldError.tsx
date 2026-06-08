type FieldErrorProps = {
  message?: string;
};

export function FieldError({ message }: FieldErrorProps) {
  return (
    <div className="registration-form__error-slot">
      {message !== undefined && message !== '' && (
        <p className="registration-form__error">{message}</p>
      )}
    </div>
  );
}
