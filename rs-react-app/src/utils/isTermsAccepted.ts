export function isTermsAccepted(formData: FormData): boolean {
  return formData.get('acceptTerms') === 'on';
}
