interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
  rows?: number;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = 'text',
  multiline = false,
  placeholder,
  autoComplete,
  rows = 6,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const fieldClass = `mt-2 w-full border bg-transparent px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-faint transition-colors hover:border-soft ${
    error ? 'border-accent' : 'border-line'
  }`;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.22em] text-soft">
          {label}
        </label>
        {hint && !error && <span className="font-mono text-[10px] text-faint">{hint}</span>}
      </div>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`${fieldClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={fieldClass}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 font-mono text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}