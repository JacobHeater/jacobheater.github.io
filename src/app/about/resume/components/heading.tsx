interface HeadingProps {
  text: string;
  barStyle?: React.CSSProperties;
}

export function Heading({ text, barStyle }: HeadingProps) {
  return (
    <div className="mt-10 mb-8">
      <div className="text-4xl font-bold text-foreground">{text}</div>
      <div
      className="mt-2 h-1"
      style={{
        backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
        ...barStyle,
      }}
      />
    </div>
  );
}
