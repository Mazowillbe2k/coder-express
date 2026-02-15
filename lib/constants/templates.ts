export const TEMPLATES = {
  landing: {
    id: "landing",
    name: "Landing Page",
    description: "Modern marketing landing page",
    category: "Marketing",
    icon: "🚀",
    features: ["Hero section", "Feature grid", "Testimonials", "CTA section"],
  },
  dashboard: {
    id: "dashboard",
    name: "Dashboard",
    description: "Admin dashboard with charts and metrics",
    category: "Admin",
    icon: "📊",
    features: ["Sidebar navigation", "Stats cards", "Data tables", "Chart integration"],
  },
  blog: {
    id: "blog",
    name: "Blog",
    description: "Content-focused blog layout",
    category: "Content",
    icon: "✍️",
    features: ["Post listing", "Single post view", "Categories", "Comments"],
  },
  ecommerce: {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online store with cart functionality",
    category: "E-commerce",
    icon: "🛒",
    features: ["Product grid", "Shopping cart", "Checkout flow", "Product details"],
  },
  portfolio: {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio website",
    category: "Personal",
    icon: "💼",
    features: ["About section", "Project showcase", "Contact form", "Skills"],
  },
  saas: {
    id: "saas",
    name: "SaaS App",
    description: "Software as a service application",
    category: "SaaS",
    icon: "☁️",
    features: ["Auth flow", "Dashboard", "Settings", "Billing"],
  },
  todo: {
    id: "todo",
    name: "Todo App",
    description: "Task management application",
    category: "Productivity",
    icon: "✅",
    features: ["Task list", "Add/edit/delete", "Categories", "Due dates"],
  },
  chat: {
    id: "chat",
    name: "Chat App",
    description: "Real-time messaging application",
    category: "Social",
    icon: "💬",
    features: ["Chat rooms", "Direct messages", "Online status", "File sharing"],
  },
};

export const TEMPLATE_CATEGORIES = [
  "All",
  "Marketing",
  "Admin",
  "Content",
  "E-commerce",
  "Personal",
  "SaaS",
  "Productivity",
  "Social",
];

export function getTemplateById(id: string) {
  return Object.values(TEMPLATES).find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string) {
  if (category === "All") {
    return Object.values(TEMPLATES);
  }
  return Object.values(TEMPLATES).filter((t) => t.category === category);
}
