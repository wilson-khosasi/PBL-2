import type { ReactNode } from 'react';
import himtiLogo from '../../assets/himti-logo.png';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#e3e3e3] px-4 py-8 font-['Poppins',sans-serif] sm:px-8 sm:py-12">
      <section className="mx-auto flex min-h-[min(100%,850px)] w-full max-w-4xl flex-col rounded-[30px] bg-white px-6 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.30),0_8px_12px_6px_rgba(0,0,0,0.15)] sm:px-12 sm:py-14 lg:px-20 lg:py-16">
        <div className="mx-auto w-full max-w-2xl">
          <img
            src={himtiLogo}
            alt="HIMTI"
            className="mx-auto h-28 w-28 object-contain sm:h-32 sm:w-32"
          />

          <header className="mt-7 text-center sm:mt-9">
            <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">{title}</h1>
            <p className="mt-3 text-lg font-medium text-black/65 sm:text-xl">{subtitle}</p>
          </header>

          <div className="mt-10 sm:mt-12">{children}</div>
          <div className="mt-9 text-center text-base font-semibold text-black/65 sm:mt-11 sm:text-lg">{footer}</div>
        </div>
      </section>
    </main>
  );
}
