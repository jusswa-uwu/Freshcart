import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> {
  label: string;
  error?: string;
  hint?: string;
  /** Element shown inside the right end of the input (e.g. a show/hide button). */
  right?: ReactNode;
}

export default function TextField({
  label,
  error,
  hint,
  right,
  className = "",
  ...input
}: TextFieldProps) {
  const id = useId();
  const descId = `${id}-desc`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error || hint ? descId : undefined}
          className={`h-12 w-full rounded-lg border bg-white px-4 text-sm outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            error ? "border-[#b42318]" : "border-line"
          } ${right ? "pr-12" : ""} ${className}`}
          {...input}
        />
        {right && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {right}
          </div>
        )}
      </div>
      {(error || hint) && (
        <p
          id={descId}
          className={`mt-1.5 text-xs ${error ? "text-[#b42318]" : "text-muted"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
