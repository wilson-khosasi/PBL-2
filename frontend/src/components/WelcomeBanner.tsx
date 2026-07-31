import welcomeBanner from '../assets/MyEventBanner.png';

export function WelcomeBanner() {
  return (
    <div className="rounded-2xl overflow-hidden mb-8">
      <img
        src={welcomeBanner}
        alt="Welcome back"
        className="w-full object-cover"
      />
    </div>
  );
}