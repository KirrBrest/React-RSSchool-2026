import { AppNav } from '@/components/AppNav';
import { SelectedItemsFlyout } from '@/components/SelectedItemsFlyout';
import '@/routes/Router.css';

type ShellLayoutProps = {
  children: React.ReactNode;
};

export default function ShellLayout({ children }: ShellLayoutProps) {
  return (
    <div className="router">
      <AppNav />
      <div className="router__content">{children}</div>
      <SelectedItemsFlyout />
    </div>
  );
}
