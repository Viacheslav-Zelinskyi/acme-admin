import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Header,
  IconButton,
  NavigationMenu,
  UserMenu,
} from "@acme/components";
import { navigationItems } from "../config/navigation";
import { useAuth } from "../features/auth/useAuth";
import "./AppShell.css";

const DESKTOP_QUERY = "(min-width: 769px)";

export function AppShell() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) =>
      e.matches && setSidebarOpen(false);

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = prevOverflow;
    };
  }, [sidebarOpen]);

  const items = navigationItems
    .filter((item) => item.key !== "users" || user !== null)
    .map((item) => ({
      ...item,
      active:
        pathname === item.href ||
        (item.href !== "/home" && pathname.startsWith(item.href)),
    }));

  const handleLogOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const brand = (
    <Link to="/home" className="app-brand">
      Acme Admin
    </Link>
  );

  return (
    <div className="app-shell">
      <Header
        leading={
          <IconButton
            icon="menu"
            label="Open navigation"
            className="app-shell__menu-button"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        brand={brand}
        actions={
          user ? (
            <UserMenu
              user={{
                id: user.id,
                name: user.name,
                avatarUrl: user.avatarUrl,
                status: user.status,
              }}
              items={[
                {
                  key: "profile",
                  label: "Profile",
                  onSelect: () => navigate("/profile"),
                },
                {
                  key: "logout",
                  label: "Logout",
                  tone: "danger",
                  onSelect: handleLogOut,
                },
              ]}
            />
          ) : (
            <Button onClick={() => navigate("/login")}>Log in</Button>
          )
        }
      />

      <div className="app-shell__layout">
        <div
          className={`app-shell__backdrop${sidebarOpen ? " app-shell__backdrop--visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <aside
          id="app-sidebar"
          className={`app-shell__sidebar${sidebarOpen ? " app-shell__sidebar--open" : ""}`}
          aria-label="Sidebar navigation"
        >
          <NavigationMenu
            items={items}
            orientation="vertical"
            renderLink={({ href, children, ...rest }) => (
              <Link to={href} {...rest}>
                {children}
              </Link>
            )}
          />
        </aside>

        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
