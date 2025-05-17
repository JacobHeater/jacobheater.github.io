export function DividerBar({ barStyle }: { barStyle?: React.CSSProperties }) {
  return (
    <div
      className="h-[2px] my-5"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--primary), var(--secondary))',
        ...barStyle,
      }}
    />
  );
}
