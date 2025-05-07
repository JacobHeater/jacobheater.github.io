export function DividerBar({ barStyle }: { barStyle?: React.CSSProperties }) {
  return (
    <div
      className="mt-2 h-1"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--primary), var(--secondary))',
        ...barStyle,
      }}
    />
  );
}
