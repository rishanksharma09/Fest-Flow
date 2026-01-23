import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
    label,
    value,
    setValue,
    placeholder,
    show,
    setShow,
  }: {
    label: string;
    value: string;
    setValue: (v: string) => void;
    placeholder: string;
    show: boolean;
    setShow: (v: boolean) => void;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-zinc-500 hover:bg-zinc-100"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );