/**
 * Future Careers Website Data Models
 */

// Navigation
export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Welcome", href: "/", id: "welcome" },
  { label: "About Us", href: "/about", id: "about" },
  { label: "Team", href: "/team", id: "team" },
  { label: "News", href: "/news", id: "news" },
  { label: "Updates", href: "/updates", id: "updates" },
  { label: "Timeline", href: "/timeline", id: "timeline" },
  { label: "Articles", href: "/articles", id: "articles" },
];

// Welcome Page
export interface CoreFocusPoint {
  title: string;
  description: string;
  icon?: string;
}

export interface WelcomePage {
  headline: string;
  description: string;
  coreFocusPoints: CoreFocusPoint[];
  latestUpdatePreview?: {
    title: string;
    date: string;
    preview: string;
    link: string;
  };
  ctaText: string;
  ctaLink: string;
}

// About Us Page
export interface CoreValue {
  title: string;
  description: string;
}

export interface AboutPage {
  aboutText: string;
  mission: string;
  vision: string;
  coreValues?: CoreValue[];
  inspirationNote?: string;
}

// Team Page
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface TeamPage {
  introduction?: string;
  members: TeamMember[];
}

// Mentor
export interface Mentor {
  id: string;
  name: string;
  surname: string;
  expertise?: string;
  photo?: string;
  linkedIn?: string;
  instagram?: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  text: string;
  date: string;
}

// News Item
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: "announcement" | "event" | "milestone";
  featured?: boolean;
}

// News Page
export interface NewsPage {
  introduction?: string;
  news: NewsItem[];
}

// Updates Item
export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  content: string;
  informal?: boolean;
}

// Updates Page
export interface UpdatesPage {
  introduction?: string;
  updates: UpdateItem[];
}

// Timeline Event
export interface TimelineEvent {
  id: string;
  phase: "Preparation" | "Implementation" | "Evaluation";
  title: string;
  date?: string;
  description: string;
  order: number;
}

// Timeline Page
export interface TimelinePage {
  introduction?: string;
  events: TimelineEvent[];
}

// Article
export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  author?: string;
  content: string;
  tags?: string[];
  excerpt?: string;
  featured?: boolean;
}

// Articles Page
export interface ArticlesPage {
  introduction?: string;
  articles: Article[];
}

// Full Site Data
export interface HZTFutureCareersWebsite {
  siteName: string;
  siteDescription: string;
  welcome: WelcomePage;
  about: AboutPage;
  team: TeamPage;
  news: NewsPage;
  updates: UpdatesPage;
  timeline: TimelinePage;
  articles: ArticlesPage;
}
