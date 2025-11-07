import type { ReactNode } from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";

type HeaderNavLinkProps = {
  to: string;
  children: ReactNode;
  end?: boolean;
};

function HeaderNavLink({ to, end, children }: HeaderNavLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: end ?? false });

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => (isActive ? "active" : undefined)}
      aria-current={match ? "page" : undefined}
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          Handshake
        </Link>
        <nav className="nav">
          <HeaderNavLink to="/" end>
            Home
          </HeaderNavLink>
          <HeaderNavLink to="/about">
            About
          </HeaderNavLink>
        </nav>
      </div>
    </header>
  );
}
