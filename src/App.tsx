import { useState } from "react";
import { Header } from "./components/layout/Header/Header";
import { HeaderModal } from "./components/layout/HeaderModal/HeaderModal";
import { MainTitle } from "./components/layout/MainTitle/MainTitle";
import { Calculator } from "./components/widgets/Calculator/Calculator";
import { MaxNumber } from "./components/widgets/MaxNumber/MaxNumber";
import { TimeCalculator } from "./components/widgets/TimeCalculator/TimeCalculator";
import { BornYear } from "./components/widgets/BornYear/BornYear";
import { Footer } from "./components/layout/Footer/Footer";
import { Football } from "./components/games/Football/Football";
import { GuessNumber } from "./components/games/GuessNumber/GuessNumber";
import { Scientists } from "./components/games/Scientists/Scientists";
import { RockPaperScissors } from "./components/games/RockPaperScissors/RockPaperScissors";
import { ScrollToTop } from "./components/layout/ScrollToTop/ScrollToTop";
// import { Team } from "./components/widgets/Team/Team";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      <HeaderModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="main-content">
        <MainTitle />

        {/* <div className="widgets-grid" style={{ padding: "2rem" }}>
          <BornYear />
          <Calculator />
          <MaxNumber />
          <TimeCalculator />
        </div> */}
        <BornYear />
        <Calculator />
        <MaxNumber />
        <TimeCalculator />

        <Football />
        <GuessNumber />
        <RockPaperScissors />
        <Scientists />
        {/* <Team /> */}
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
