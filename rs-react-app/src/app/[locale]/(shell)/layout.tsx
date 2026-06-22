import { AppNav } from '@/components/AppNav';
import { SelectedItemsFlyout } from '@/components/SelectedItemsFlyout';
import '@/routes/AppShell.css';

type ShellLayoutProps = {
  children: React.ReactNode;
};

export default function ShellLayout({ children }: ShellLayoutProps) {
  return (
    <div className="app-shell">
      <AppNav />
      <div className="app-shell__content">{children}</div>
      <SelectedItemsFlyout />
    </div>
  );
}
