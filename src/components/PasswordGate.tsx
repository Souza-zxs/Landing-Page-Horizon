import { useState } from "react";

type PasswordGateProps = {
  title: string;
  error?: string;
  onSubmit: (password: string) => void;
};

export default function PasswordGate({ title, error, onSubmit }: PasswordGateProps) {
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(passwordInput);
        }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-lg font-medium text-gray-900">{title}</h1>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Senha"
          autoFocus
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="rounded-lg bg-horizon-orange text-white py-3 text-sm font-medium hover:bg-[#e55f00] transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
