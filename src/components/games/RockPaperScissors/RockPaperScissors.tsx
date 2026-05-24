
import rock from "../../../assets/rock.svg"
import paper from "../../../assets/paper.svg"
import scissors from "../../../assets/scissors.svg"
import glass from "../../../assets/glass.png"
import torch from "../../../assets/torch.png"
import { useState } from 'react';
import './RockPaperScissors.scss';

type ChoiceId = 0 | 1 | 2 | 3 | 4 | 5;
type Difficulty = 1 | 2 | 3 | 4;

interface Choice {
  id: ChoiceId;
  name: string;
  imgSrc: string;
  alt: string;
}

const CHOICES: Choice[] = [
  { id: 1, name: 'rock', imgSrc: rock, alt: 'rock' },
  { id: 2, name: 'scissors', imgSrc: scissors, alt: 'scissors' },
  { id: 3, name: 'paper', imgSrc: paper, alt: 'paper' },
  { id: 4, name: 'torch', imgSrc: torch, alt: 'torch' },
  { id: 5, name: 'glass of water', imgSrc: glass, alt: 'glass' },
];

export const RockPaperScissors = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(2);
  const [userChoice, setUserChoice] = useState<ChoiceId>(0);
  
  const [scores, setScores] = useState({ pc: 0, user: 0, tie: 0 });
  
  const [resultText, setResultText] = useState('Let\'s play');
  const [resultColor, setResultColor] = useState<'default' | 'green' | 'grey' | 'red'>('default');
  const [pcChoiceText, setPcChoiceText] = useState('');

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const resetGame = () => {
    setScores({ pc: 0, user: 0, tie: 0 });
    setResultText('Let\'s play');
    setResultColor('default');
    setUserChoice(0);
    setPcChoiceText('');
  };

  const playGame = () => {
    if (userChoice === 0) {
      setResultText('Choose an option!');
      setResultColor('red');
      return;
    }

    let pcChoice = Math.floor(Math.random() * 3) + 1;

    if (difficulty === 1) { 
      if (Math.floor(Math.random() * 10) + 1 === 1) {
        pcChoice = userChoice === 1 ? 3 : userChoice - 1;
      } else if (Math.floor(Math.random() * 10) + 1 === 1) {
        pcChoice = userChoice;
      } else {
        pcChoice = userChoice === 3 ? 1 : userChoice + 1;
      }
    } else if (difficulty === 3) { 
      if (Math.floor(Math.random() * 50) + 1 === 1) {
        pcChoice = userChoice === 3 ? 1 : userChoice + 1;
      } else if (Math.floor(Math.random() * 50) + 1 === 1) {
        pcChoice = userChoice;
      } else {
        pcChoice = userChoice === 1 ? 3 : userChoice - 1;
      }
    } else if (difficulty === 4) { 
      pcChoice = Math.floor(Math.random() * 5) + 1;
    }

    const pcChoiceObj = CHOICES.find(c => c.id === pcChoice);
    if (pcChoiceObj) {
      setPcChoiceText(`Computer chose ${pcChoiceObj.name}`);
    }

    if (
      (userChoice === 1 && (pcChoice === 2 || pcChoice === 5)) ||
      (userChoice === 2 && (pcChoice === 3 || pcChoice === 5)) ||
      (userChoice === 3 && (pcChoice === 1 || pcChoice === 4)) ||
      (userChoice === 4 && (pcChoice === 1 || pcChoice === 2)) ||
      (userChoice === 5 && (pcChoice === 3 || pcChoice === 4))
    ) {
      setScores(prev => ({ ...prev, user: prev.user + 1 }));
      setResultText('You won the round!');
      setResultColor('green');
    } else if (userChoice === pcChoice) {
      setScores(prev => ({ ...prev, tie: prev.tie + 1 }));
      setResultText('Draw!');
      setResultColor('grey');
    } else {
      setScores(prev => ({ ...prev, pc: prev.pc + 1 }));
      setResultText("Computer won the round!");
      setResultColor('red');
    }
  };

  const visibleChoices = difficulty === 4 ? CHOICES : CHOICES.slice(0, 3);

  return (
    <section className="widget-card rock-paper-scissors" id="rock-paper-scissors">
      <div className="rock-paper-scissors-container">
        <h2 className="widget-card__title" style={{ textAlign: 'center' }}>Rock - Paper - Scissors</h2>
        
        <ul className={`rock-paper-scissors-list ${difficulty === 4 ? 'extended' : ''}`}>
          {visibleChoices.map((choice) => (
            <li 
              key={choice.id}
              className={`rock-paper-scissors-item ${userChoice === choice.id ? 'active' : ''}`}
              onClick={() => setUserChoice(choice.id)}
            >
              <img
                className="rock-paper-scissors-image"
                src={choice.imgSrc}
                alt={choice.alt}
              />
            </li>
          ))}
        </ul>

        <div className="rock-paper-scissors-actions">
          <p className={`rock-paper-scissors-text color-${resultColor}`}>{resultText}</p>
          <button className="form-button rock-paper-scissors-button" onClick={playGame}>
            Reveal computer's choice
          </button>
          <p className="rock-paper-scissors-choice">{pcChoiceText}</p>
        </div>

        <div className="rock-paper-scissors-info">
          <p className="rock-paper-scissors-stats">Score:</p>
          <p className="rock-paper-scissors-stats">Computer - <span>{scores.pc}</span></p>
          <p className="rock-paper-scissors-stats">You - <span>{scores.user}</span></p>
          <p className="rock-paper-scissors-stats">Draws - <span>{scores.tie}</span></p>
          <button className="rock-paper-scissors-update" onClick={resetGame}>Reset</button>
        </div>

        <div className="rock-paper-scissors-settings">
          <p className="rock-paper-scissors-stats">Mode:</p>
          <div className="settings-buttons">
            <button 
              className={`rock-paper-scissors-difficulty ${difficulty === 1 ? 'active' : ''}`}
              onClick={() => handleDifficultyChange(1)}>Easy</button>
            <button 
              className={`rock-paper-scissors-difficulty ${difficulty === 2 ? 'active' : ''}`}
              onClick={() => handleDifficultyChange(2)}>Normal</button>
            <button 
              className={`rock-paper-scissors-difficulty ${difficulty === 3 ? 'active' : ''}`}
              onClick={() => handleDifficultyChange(3)}>Impossible</button>
            <button 
              className={`rock-paper-scissors-difficulty ${difficulty === 4 ? 'active' : ''}`}
              onClick={() => handleDifficultyChange(4)}>Extended</button>
          </div>
        </div>
      </div>
    </section>
  );
};