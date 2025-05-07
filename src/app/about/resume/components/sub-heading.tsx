export function SubHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="mt-8 mb-4">
      <div className={`text-2xl font-semibold text-foreground ${className}`}>
        {text}
      </div>
    </div>
  );
}
