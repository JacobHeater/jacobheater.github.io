interface TechnicalToolkitListProps {
  title: string;
  skills: string[];
}

export function TechnicalToolkitList({
  title,
  skills,
}: TechnicalToolkitListProps) {
  return (
    <div className="mt-6">
      <div className="text-xl font-semibold text-foreground">{title}</div>
      <div className="text-base text-foreground/80">{skills.join(', ')}</div>
    </div>
  );
}
