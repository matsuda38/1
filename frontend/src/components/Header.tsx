import { Link as RouterLink, useMatch, useResolvedPath } from "react-router-dom";
import { Button, Link as NextLink } from "@nextui-org/react";

interface NavItemProps {
  to: string;
  label: string;
  end?: boolean;
}

function NavItem({ to, label, end }: NavItemProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: end ?? false });

  return (
    <Button
      as={RouterLink}
      to={to}
      size="sm"
      color="primary"
      variant={match ? "solid" : "light"}
      className="nav-button"
      aria-current={match ? "page" : undefined}
    >
      {label}
    </Button>
  );
}

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <NextLink
          as={RouterLink}
          to="/"
          className="brand"
          color="foreground"
          underline="none"
        >
          Handshake
        </NextLink>
        <nav className="nav">
          <NavItem to="/" label="Home" end />
          <NavItem to="/about" label="About" />
        </nav>
      </div>
    </header>
  );
}
