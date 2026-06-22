export function getPersonAvatarUrl(name: string, size = 128): string {
  const seed = encodeURIComponent(name.trim() || 'unknown');

  return `https://api.dicebear.com/9.x/initials/png?seed=${seed}&size=${size}`;
}
