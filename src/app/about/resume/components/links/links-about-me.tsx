import { SubHeading } from "../sub-heading";

export default function LinksAboutMe() {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-wide uppercase text-[var(--primary)]">
        Additional Projects
      </div>
      <div className="text-lg font-semibold mt-2 text-[var(--job)]">
        npm Packages
      </div>
      <ul className="list-disc pl-5 space-y-4 text-[var(--foreground)]">
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
      <div className="text-lg font-semibold mt-2 text-[var(--job)]">Repositories</div>
      <ul className="list-disc pl-5 space-y-4 text-[var(--foreground)]">
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
      <div className="text-lg font-semibold mt-2 text-[var(--job)]">Other Links About Me</div>
      <ul className="list-disc pl-5 space-y-4 text-[var(--foreground)]">
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
