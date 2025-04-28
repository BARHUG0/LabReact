alert(
  "¡Bienvenido un juego de memoria con temática de Star Wars!\nPara hacerlo más emocionante y probar tu memoria, deberás scrollear para hallar todas las cartas.\n\n\n¡Que la fuerza te acompañe!",
);

const STAR_WARS_SABERS = [
  { handle: "kylos", color: "red" },
  { handle: "obis", color: "blue" },
  { handle: "dark", color: "dark" },
  { handle: "generic", color: "blue" },
  { handle: "generic", color: "green" },
  { handle: "generic", color: "red" },
  { handle: "obis", color: "purple" },
  { handle: "kylos", color: "blue" },
];

const getRandomInteger = (max) => Math.floor(Math.random() * max);

const toShuffledArray = (arr) =>
  arr.toSorted(() => {
    const random = Math.random() * getRandomInteger(9) - getRandomInteger(5);
    if (random < 1 / 3) {
      return -1;
    }
    if (random < 2 / 3) {
      return 0;
    }
    return 1;
  });

const shuffleCards = () => {
  const singleCards = STAR_WARS_SABERS.map((saber) => ({
    ...saber,
    isFlipped: false,
    isPaired: false,
  }));

  return toShuffledArray(singleCards).concat(toShuffledArray(singleCards));
};

const startingCards = shuffleCards();

//COMPONENTS
function MemoryCard({ handle, color, isFlipped, isPaired, toggleFlipped }) {
  if (isPaired) {
    return (
      <div
        className={`${handle} ${handle}-${color}-on card-shape card-obverse flip-to-obverse-animation`}
      >
        <p className={`obverse-text ${color}-text`}>
          {color.toUpperCase()}
        </p>{" "}
      </div>
    );
  }
  const animationCSSClass = isFlipped
    ? "flip-to-obverse-animation"
    : "flip-to-reverse-animation";
  const obverseCSSClass = `${handle} card-shape card-obverse ${animationCSSClass}`;
  const reverseCSSClass = `card-shape card-reverse ${animationCSSClass}`;
  return (
    <div className="card-wrap" onClick={toggleFlipped}>
      <div className={obverseCSSClass} key={`obverse-${isFlipped}`}>
        <p className={`obverse-text ${color}-text`}>
          {color.toUpperCase()}
        </p>{" "}
      </div>

      <img
        className={reverseCSSClass}
        src="./img/reverse.png"
        key={`reverse-${isFlipped}`}
      />
    </div>
  );
}

function MemoryGrid({ cards, playTurn }) {
  return (
    <section className="memory-grid">
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          handle={card.handle}
          color={card.color}
          isFlipped={card.isFlipped}
          isPaired={card.isPaired}
          toggleFlipped={() => playTurn(index)}
        />
      ))}
    </section>
  );
}

function InformationBoard({ moves, restartGame }) {
  return (
    <section className="info-board">
      <img className="logo" src="./img/xwing.png" />
      <p className="moves-text">{`Has realizado ${moves} movimientos`}</p>
      <button className="reset" onClick={restartGame}>
        Reiniciar
      </button>
      <img className="logo" src="./img/tie.png" />
    </section>
  );
}

function MemoryGame() {
  const [cards, setCards] = React.useState(startingCards);
  const [flippedCardsIndexes, setFlippedCardIndexes] = React.useState([]);
  const [moves, setMoves] = React.useState(0);
  const [resetCount, setResetCount] = React.useState(0);

  const checkWin = () => {
    const pairedCards = cards.reduce(
      (accumulator, currentCard) =>
        (accumulator += currentCard.isPaired ? 1 : 0),
      0,
    );
    if (pairedCards === cards.length) {
      return true;
    }
    return false;
  };

  const toggleCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, currentIndex) =>
        currentIndex === index ? { ...card, isFlipped: !card.isFlipped } : card,
      ),
    );
  };

  const pairCards = (index1, index2) => {
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
    setMoves(moves + 1);
    if (flippedCardsIndexes.length === 0) {
      resetUnpairedCardsFlip();
    }
    toggleCard(index);

    if (flippedCardsIndexes[0] !== index) {
      setFlippedCardIndexes(flippedCardsIndexes.concat([index]));
    } else {
      setFlippedCardIndexes([]);
    }
  };

  if (checkWin()) {
    setTimeout(() => {
      if (confirm("¡La fuerza es fuerte en ti!\n¿Deseas volver a jugar?")) {
        restartGame();
      }
    }, 2000);
  }

  if (flippedCardsIndexes.length > 1) {
    const index1 = flippedCardsIndexes[0];
    const index2 = flippedCardsIndexes[1];
    const card1 = cards[index1];
    const card2 = cards[index2];

    if (
      index1 !== index2 &&
      card1.handle === card2.handle &&
      card1.color === card2.color
    ) {
      pairCards(index1, index2);
    }
    setFlippedCardIndexes([]);
  }

  const restartGame = () => {
    setCards(shuffleCards());
    setFlippedCardIndexes([]);
    setMoves(0);
    setResetCount(resetCount + 1);
  };

  return (
    <>
      <InformationBoard
        moves={moves}
        restartGame={() => {
          if (confirm("¿Deseas reiniciar el juego?")) {
            restartGame();
          }
        }}
      />
      <div className="memory-grid-container">
        <MemoryGrid cards={cards} playTurn={playTurn} key={resetCount} />
      </div>
    </>
  );
}

function Canvas() {
  return (
    <div className="canvas">
      <div className="kylos kylos-purple"></div>
      <div className="dark dark-purple"></div>
      <div className="obis obis-purple"></div>
      <div className="generic generic-purple"></div>
    </div>
  );
}

function App(props) {
  return <MemoryGame />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
