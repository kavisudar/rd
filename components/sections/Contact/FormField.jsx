import { CheckCircle2 } from "lucide-react";

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  autoComplete,
  required = false,
  maxLength,
}) {
  const showError = Boolean(touched && error);
  const showValid = Boolean(touched && !error && value.trim().length > 0);

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
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          aria-required={required}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`w-full rounded-[16px] border bg-[#fbfaf8] px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-luxury placeholder:text-text-muted/70 ${
            showValid ? "pr-11" : ""
          } ${
            showError
              ? "border-red-300 focus:border-red-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
              : "border-[#e9e3d6] focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(79,70,229,0.15)]"
          }`}
        />
        {showValid && (
          <CheckCircle2
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
          />
        )}
      </div>
      {/* Fixed-height slot so an appearing error never shifts fields below it
          (a layout jump here can make an in-flight click on a later field miss). */}
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
