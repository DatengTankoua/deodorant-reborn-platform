export const siteConfig = {
  name: "intellij-deodorant-reborn",
  plugin: {
    title: "intellij-deodorant-reborn",
    description:
      "Open-source IntelliJ IDEA plugin for detecting and refactoring Type-1 and Type-2 code clones in Java/Kotlin projects — research-driven, automated refactoring suggestions.",
    downloadUrl: "https://plugins.jetbrains.com/plugin/your-plugin-id",
    sourceUrl: "https://github.com/your-username/intellij-deodorant-reborn",
  },
  author: {
    name: "Your Name",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-profile",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],
} as const
