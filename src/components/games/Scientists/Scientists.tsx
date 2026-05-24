import { useState, useEffect } from "react";
import "./Scientists.scss";

interface Scientist {
  id: number;
  name: string;
  surname: string;
  born: number;
  dead: number;
}

// Translated dataset[cite: 1]
const SCIENTISTS_DATA: Scientist[] = [
  { name: "Albert", surname: "Einstein", born: 1879, dead: 1955, id: 1 },
  { name: "Isaac", surname: "Newton", born: 1643, dead: 1727, id: 2 },
  { name: "Galileo", surname: "Galilei", born: 1564, dead: 1642, id: 3 },
  { name: "Marie", surname: "Curie", born: 1867, dead: 1934, id: 4 },
  { name: "Johannes", surname: "Kepler", born: 1571, dead: 1630, id: 5 },
  { name: "Nicolaus", surname: "Copernicus", born: 1473, dead: 1543, id: 6 },
  { name: "Max", surname: "Planck", born: 1858, dead: 1947, id: 7 },
  { name: "Katherine", surname: "Blodgett", born: 1898, dead: 1979, id: 8 },
  { name: "Ada", surname: "Lovelace", born: 1815, dead: 1852, id: 9 },
  { name: "Sarah E.", surname: "Goode", born: 1855, dead: 1905, id: 10 },
  { name: "Lise", surname: "Meitner", born: 1878, dead: 1968, id: 11 },
  { name: "Hanna", surname: "Hammarström", born: 1829, dead: 1909, id: 12 },
];

export const Scientists = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [displayedScientists, setDisplayedScientists] = useState<Scientist[]>(
    [],
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCleared, setIsCleared] = useState(true);

  // Filter logic adjusted for English names[cite: 1]
  const filterLogic: Record<number, (arr: Scientist[]) => Scientist[]> = {
    0: (arr) => arr.filter((s) => s.born >= 1801 && s.born <= 1900),
    1: (arr) => [...arr].sort((a, b) => a.name.localeCompare(b.name, "en")),
    2: (arr) => [...arr].sort((a, b) => a.dead - a.born - (b.dead - b.born)),
    3: (arr) => {
      if (arr.length === 0) return [];
      const latestBorn = arr.reduce(
        (latest, s) => (s.born > latest.born ? s : latest),
        arr[0],
      );
      return [latestBorn];
    },
    4: (arr) =>
      arr.filter((s) => s.name === "Albert" && s.surname === "Einstein"),
    5: (arr) => arr.filter((s) => s.surname.startsWith("C")),
    6: (arr) => arr.filter((s) => s.name[0] !== "A"),
    7: (arr) => {
      if (arr.length === 0) return [];
      const sorted = [...arr].sort(
        (a, b) => a.dead - a.born - (b.dead - b.born),
      );
      if (sorted.length === 1) return [sorted[0]];
      return [sorted[0], sorted[sorted.length - 1]];
    },
    8: (arr) => arr.filter((s) => s.name[0] === s.surname[0]),
  };

  const handleToggleFilter = (filterId: number) => {
    setIsFlipping(true);

    setTimeout(() => {
      setIsCleared(true);
      setActiveFilters((prev) => {
        const nextFilters = prev.includes(filterId)
          ? prev.filter((id) => id !== filterId)
          : [...prev, filterId];
        return nextFilters;
      });
    }, 250);
  };

  useEffect(() => {
    let result = [...SCIENTISTS_DATA];
    activeFilters.forEach((filterId) => {
      result = filterLogic[filterId](result);
    });

    const timer = setTimeout(() => {
      setDisplayedScientists(result);
      setIsCleared(false);
      setIsFlipping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeFilters]);

  const gridSlots = Array.from({ length: 12 });

  return (
    <section className="widget-card scientists-section" id="scientists">
      <div className="scientists-container">
        {/* Translated Layout Text[cite: 2] */}
        <h3 className="scientists-title">Choose scientist(s)</h3>

        <ul className="scientists-grid">
          {gridSlots.map((_, i) => {
            const scientist = displayedScientists[i];
            return (
              <li
                key={i}
                className={`scientist-box ${isFlipping ? "flipped" : ""}`}
              >
                {!isCleared && scientist && (
                  <div className="scientist-content">
                    {scientist.name} {scientist.surname} <br /> {scientist.born}
                    -{scientist.dead}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="sort-list">
          <ul className="sort-list-col">
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(0) ? "active" : ""}`}
                onClick={() => handleToggleFilter(0)}
              >
                Scientists born in the 19th century
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(1) ? "active" : ""}`}
                onClick={() => handleToggleFilter(1)}
              >
                Sort scientists alphabetically
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(2) ? "active" : ""}`}
                onClick={() => handleToggleFilter(2)}
              >
                Sort scientists by lifespan
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(3) ? "active" : ""}`}
                onClick={() => handleToggleFilter(3)}
              >
                Find the latest born scientist
              </button>
            </li>
          </ul>
          <ul className="sort-list-col">
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(4) ? "active" : ""}`}
                onClick={() => handleToggleFilter(4)}
              >
                Find Albert Einstein's birth year
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(5) ? "active" : ""}`}
                onClick={() => handleToggleFilter(5)}
              >
                Find scientists whose surname starts with "C"
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(6) ? "active" : ""}`}
                onClick={() => handleToggleFilter(6)}
              >
                Remove scientists whose first name starts with "A"
              </button>
            </li>
            <li>
              <button
                className={`sort-list-item ${activeFilters.includes(7) ? "active" : ""}`}
                onClick={() => handleToggleFilter(7)}
              >
                Find the scientist who lived the longest
                <br />
                and the shortest
              </button>
            </li>
          </ul>
        </div>
        <p className="sort-list-footer">
          <button
            className={`sort-list-item last ${activeFilters.includes(8) ? "active" : ""}`}
            onClick={() => handleToggleFilter(8)}
          >
            Find scientists with matching first letters of their first and last
            names
          </button>
        </p>
      </div>
    </section>
  );
};
