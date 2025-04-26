const testCards = [
  { name: "a", isFlipped: false, isPaired: false },
  { name: "a", isFlipped: false, isPaired: false },
  { name: "b", isFlipped: false, isPaired: false },
  { name: "b", isFlipped: false, isPaired: false },
  { name: "c", isFlipped: false, isPaired: false },
  { name: "c", isFlipped: false, isPaired: false },
  { name: "d", isFlipped: false, isPaired: false },
  { name: "d", isFlipped: false, isPaired: false },
  { name: "e", isFlipped: false, isPaired: false },
  { name: "e", isFlipped: false, isPaired: false },
  { name: "f", isFlipped: false, isPaired: false },
  { name: "f", isFlipped: false, isPaired: false },
  { name: "g", isFlipped: false, isPaired: false },
  { name: "g", isFlipped: false, isPaired: false },
  { name: "h", isFlipped: false, isPaired: false },
  { name: "h", isFlipped: false, isPaired: false },
];

function MemoryCard({ value, isFlipped, toggleFlipped }) {
  return (
    <div className="card-shape" onClick={toggleFlipped}>
      {isFlipped ? value : "???"}
    </div>
  );
}

function MemoryGrid() {
  const [cards, setCards] = React.useState(testCards);
  const [flippedCardsIndexes, setFlippedCardIndexes] = React.useState([]);

  const flipCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, currentIndex) =>
        currentIndex === index ? { ...card, isFlipped: true } : card,
      ),
    );
  };

  const pairCards = (index1, index2) => {
    console.log("NEW PAIR");
    setCards((prevCards) =>
      prevCards.map((card, currentIndex) =>
        currentIndex === index1 || currentIndex === index2
          ? { ...card, isPaired: true }
          : card,
      ),
    );
  };

  const resetUnpairedCardsFlip = () => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.isPaired ? card : { ...card, isFlipped: false },
      ),
    );
  };

  const playTurn = (index) => {
    if (flippedCardsIndexes.length === 0) {
      resetUnpairedCardsFlip();
    }
    flipCard(index);
    setFlippedCardIndexes(flippedCardsIndexes.concat([index]));
  };

  if (flippedCardsIndexes.length > 1) {
    const index1 = flippedCardsIndexes[0];
    const index2 = flippedCardsIndexes[1];
    if (index1 !== index2 && cards[index1].name === cards[index2].name) {
      pairCards(index1, index2);
    }
    setFlippedCardIndexes([]);
  }

  return (
    <div className="memory-grid">
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          value={card.name}
          isFlipped={card.isFlipped}
          toggleFlipped={() => playTurn(index)}
        />
      ))}
    </div>
  );
}

function Canvas() {
  return (
    <div className="canvas">
      <div className="kylos"></div>
      <div className="dark"></div>
      <div className="obis"></div>
    </div>
  );
}

function App(props) {
  return <Canvas />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
