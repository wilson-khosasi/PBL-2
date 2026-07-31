import logoHimti from '../assets/logo_himti.png';

export function AuthLogo() {
  return (
    <img
      src={logoHimti}
      alt="HIMTI Logo"
      className="w-24 h-24 mx-auto object-contain"
    />
  );
}
