import { DividerBar } from './divider-bar';

interface HeadingProps {
  text: string;
  barStyle?: React.CSSProperties;
}

export function Heading({ text }: HeadingProps) {
  return (
    <div className="mt-8 mb-4">
      {text && <div className="text-4xl font-bold text-foreground">{text}</div>}
      <DividerBar />
    </div>
  );
}
