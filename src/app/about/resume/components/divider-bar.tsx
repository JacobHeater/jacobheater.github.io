export function DividerBar({ barStyle }: { barStyle?: React.CSSProperties }) {
  return (
    <div
      className="h-[2px] w-full my-5 block"
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--primary), var(--secondary))',
        ...barStyle,
      }}
    />
  );
}
