import { DividerBar } from './divider-bar';

interface HeadingProps {
  text: string;
  barStyle?: React.CSSProperties;
}

export function Heading({ text, barStyle }: HeadingProps) {
  return (
    <div className="mt-10 mb-8">
      {text && <div className="text-4xl font-bold text-foreground">{text}</div>}
      <DividerBar />
    </div>
  );
}
