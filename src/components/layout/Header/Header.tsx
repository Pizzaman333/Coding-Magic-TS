import { useTheme } from "../../../context/ThemeContext";
import "./Header.scss";

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header = ({ onOpenMenu }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">ReactWidgets</div>

        <nav className="header__nav">
          <a href="#games">Games</a>
          <a href="#utils">Utilities</a>
          <a href="#team">Team</a>
        </nav>

        <div className="header__actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button
            className="menu-button"
            onClick={onOpenMenu}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};
