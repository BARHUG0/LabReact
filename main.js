function Saludo({ message, name }) {
    return (
        <li>
            {message} {name}!{" "}
        </li>
    );
}

function App(props) {
    return (
        <ul>
            <Saludo message="Hola" name="o" />
            <Saludo message="Adios" name="Daniel" />
        </ul>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
