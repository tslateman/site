export const SITE = {
  website: "https://tslateman.com/",
  author: "Tommy Slater",
  profile: "https://tslateman.com/",
  desc: "Thoughts on living and working well. Where philosophy meets programming.",
  title: "tslateman",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: false,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "America/Los_Angeles",
} as const;
