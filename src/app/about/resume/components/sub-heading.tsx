export function SubHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="mt-4 mb-2">
      <div className={`text-2xl font-semibold text-foreground ${className}`}>
        {text}
      </div>
    </div>
  );
}
