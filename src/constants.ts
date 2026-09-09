import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/tslateman",
    linkTitle: `${SITE.title} on GitHub`,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tommyslater/",
    linkTitle: `${SITE.title} on LinkedIn`,
  },
] as const;
