import type { NavigationMenuItem } from "@acme/components";

// Application-specific routes are configured here, not in the UI library
export type AppNavigationItem = Omit<NavigationMenuItem, "active">;

export const navigationItems: AppNavigationItem[] = [
  { key: "home", label: "Home", href: "/home", icon: "home" },
  { key: "users", label: "Users", href: "/users", icon: "users" },
  { key: "about", label: "About", href: "/about", icon: "info" },
];