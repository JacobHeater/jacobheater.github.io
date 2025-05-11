interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-6 py-3 border border-[var(--primary)] text-base font-medium rounded-md shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
      {children}
    </button>
  );
}
