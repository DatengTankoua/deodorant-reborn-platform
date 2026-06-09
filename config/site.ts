/** Translation key for nav items — matches keys in the Nav namespace of each messages file. */
export type NavKey = 'home' | 'docs' | 'community' | 'research' | 'projects' | 'about'

export const siteConfig = {
  name: 'intellij-deodorant-reborn',
  plugin: {
    title: 'intellij-deodorant-reborn',
    description:
      'Open-source IntelliJ IDEA plugin for detecting and refactoring Type-1 and Type-2 code clones in Java/Kotlin projects — research-driven, automated refactoring suggestions.',
    downloadUrl: 'https://plugins.jetbrains.com/plugin/your-plugin-id',
    sourceUrl: 'https://github.com/your-username/intellij-deodorant-reborn',
  },
  author: {
    name: 'Your Name',
    github: 'https://github.com/your-username',
    linkedin: 'https://www.linkedin.com/in/your-profile',
  },
  nav: [
    { key: 'home' as NavKey, href: '/' },
    { key: 'docs' as NavKey, href: '/docs' },
    { key: 'community' as NavKey, href: '/community' },
    { key: 'research' as NavKey, href: '/research' },
    { key: 'projects' as NavKey, href: '/projects' },
    { key: 'about' as NavKey, href: '/about' },
  ],
} as const
