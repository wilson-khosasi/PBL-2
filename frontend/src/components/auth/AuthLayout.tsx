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
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#e3e3e3] px-3 py-4 font-['Poppins',sans-serif] sm:px-6 sm:py-8">
      <section className="w-full max-w-xl rounded-[24px] bg-white px-5 py-7 shadow-[0_4px_4px_rgba(0,0,0,0.30),0_8px_12px_6px_rgba(0,0,0,0.15)] sm:rounded-[30px] sm:px-10 sm:py-10 lg:max-w-2xl lg:px-16 lg:py-12 xl:px-20 xl:py-14">
        <div className="mx-auto w-full">
          <img
            src={himtiLogo}
            alt="HIMTI"
            className="mx-auto h-20 w-20 object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          />

          <header className="mt-5 text-center sm:mt-6 lg:mt-7">
            <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl lg:text-4xl">{title}</h1>
            <p className="mt-2 text-base font-medium text-black/65 sm:text-lg lg:text-xl">{subtitle}</p>
          </header>

          <div className="mt-7 sm:mt-8 lg:mt-10">{children}</div>
          <div className="mt-6 text-center text-sm font-semibold text-black/65 sm:mt-8 sm:text-base lg:mt-10 lg:text-lg">{footer}</div>
        </div>
      </section>
    </main>
  );
}
