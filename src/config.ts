export const SITE = {
  website: "https://tslateman.com/", // replace this with your deployed domain
  author: "Tommy Slater",
  profile: "https://tslateman.com/",
  desc: "Thoughts on living and working well. Where philosophy meets programming.",
  title: "tslateman",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
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
