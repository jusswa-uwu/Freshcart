import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import TextField from "./TextField";

type PasswordFieldProps = Omit<
  ComponentProps<typeof TextField>,
  "type" | "right"
>;

export default function PasswordField(props: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      right={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="text-muted hover:text-brand"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
