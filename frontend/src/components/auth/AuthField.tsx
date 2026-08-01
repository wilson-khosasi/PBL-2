interface AuthFieldProps {
  id: string;
  label: string;
  type?: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-medium text-black/65 sm:mb-2 sm:text-lg lg:text-xl">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-[18px] border-2 bg-white px-4 py-3 text-base text-black outline-none transition placeholder:text-black/40 focus:border-[#415aa7] focus:ring-4 focus:ring-[#415aa7]/15 disabled:cursor-not-allowed disabled:bg-black/5 sm:rounded-[22px] sm:px-5 sm:py-3.5 sm:text-lg lg:rounded-[26px] lg:px-6 lg:py-4 lg:text-xl ${
          error ? 'border-red-500' : 'border-black/20'
        }`}
      />
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
