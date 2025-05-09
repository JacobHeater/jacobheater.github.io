import { Heading } from '../components/heading';
import { SubHeading } from '../components/sub-heading';

export default function LinksAboutMe() {
  return (
    <div className="px-8">
      <Heading text="Additional Projects" />
      <SubHeading text="npm Packages" className="text-[var(--accent)]" />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="https://www.npmjs.com/package/system-restore"
            className="underline text-primary hover:text-secondary">
            system-restore
          </a>
          <br />
          <span>
            Allows for scripting system restore points (Windows) using
            JavaScript.
          </span>
        </li>
      </ul>
      <SubHeading text="Repositories" className="text-[var(--accent)]" />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="https://github.com/jacobheater/"
            className="underline text-primary hover:text-secondary">
            GitHub/jacobheater
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/JacobHeater"
            className="underline text-primary hover:text-secondary">
            GitLab/jacobheater
          </a>
        </li>
      </ul>
      <SubHeading
        text="Other Links About Me"
        className="text-[var(--accent)]"
      />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="http://stackoverflow.com/users/2023218/jacob-heater"
            className="underline text-primary hover:text-secondary">
            StackOverflow
          </a>
        </li>
        <li>
          <a
            href="https://www.hackerrank.com/jacobheater"
            className="underline text-primary hover:text-secondary">
            HackerRank
          </a>
        </li>
      </ul>
    </div>
  );
}
