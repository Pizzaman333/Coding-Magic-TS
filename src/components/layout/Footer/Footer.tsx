import "./Footer.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} React Widgets. Built with Vite and TypeScript.</p>
    </footer>
  );
};
