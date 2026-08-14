import { CheckCircle2, ChevronDown } from "lucide-react";

export default function FormSelect({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  placeholder = "Select an option",
  required = false,
}) {
  const showError = Boolean(touched && error);
  const showValid = Boolean(touched && !error && value);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
        {required && (
          <span className="ml-0.5 text-gold" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`w-full appearance-none rounded-[16px] border bg-[#fbfaf8] px-4 py-2.5 pr-10 text-sm outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-luxury ${
            value ? "text-ink" : "text-text-muted/70"
          } ${
            showError
              ? "border-red-300 focus:border-red-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
              : "border-[#e9e3d6] focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(79,70,229,0.15)]"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
        />
        {showValid && (
          <CheckCircle2
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 text-emerald-500"
          />
        )}
      </div>
      <div className="min-h-3">
        {showError && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
