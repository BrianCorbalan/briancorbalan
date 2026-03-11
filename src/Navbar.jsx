import "./App.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </div>

      <div className="nav-right">
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
      </div>

    </nav>
  );
}