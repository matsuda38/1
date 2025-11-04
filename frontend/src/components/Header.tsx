import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">Handshake</Link>
        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : undefined}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "active" : undefined}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}
