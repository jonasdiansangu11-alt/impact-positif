export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
}
