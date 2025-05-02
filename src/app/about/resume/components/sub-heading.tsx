export function SubHeading({ text }: { text: string }) {
  return (
    <div className="mt-8 mb-4">
      <div className="text-2xl font-semibold text-foreground">{text}</div>
    </div>
  );
}
