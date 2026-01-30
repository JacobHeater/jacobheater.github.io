export default function LinksAboutMe() {
  const links = [
    { label: 'npm: system-restore', url: 'npmjs.com/package/system-restore' },
    { label: 'GitLab', url: 'gitlab.com/JacobHeater' },
    {
      label: 'StackOverflow',
      url: 'stackoverflow.com/users/2023218/jacob-heater',
    },
    { label: 'HackerRank', url: 'hackerrank.com/jacobheater' },
  ];

  return (
    <div>
      <div className="text-xl font-bold mb-3 pb-1 border-b border-[var(--primary)] text-[var(--primary)] uppercase tracking-wider print:text-lg print:mb-2">
        Additional Links
      </div>
      <div className="flex flex-col gap-1.5 text-sm">
        {links.map((link) => (
          <div key={link.url} className="flex items-center gap-2">
            <a
              href={`https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] transition-colors print:hidden">
              {link.label}
            </a>
            <span className="hidden print:inline font-medium">
              {link.label}:
            </span>
            <span className="hidden print:inline text-[var(--gray-600)]">
              {link.url}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
