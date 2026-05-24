import { useState } from "react";
import { Header } from "./components/layout/Header/Header";
import { HeaderModal } from "./components/layout/HeaderModal/HeaderModal";
import { MainTitle } from "./components/layout/MainTitle/MainTitle";
import { Footer } from "./components/layout/Footer/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop/ScrollToTop";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      <HeaderModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="main-content">
        <MainTitle />

        <div
          className="widgets-grid"
          style={{ minHeight: "100vh", padding: "2rem" }}
        >
          <p>Widgets will go here...</p>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
