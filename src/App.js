import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu/Menu";
//Demarrer json server
//json-server --watch db.json

function App() {
  return (
    <div className="App">
      <Menu/>
    </div>
  );
}

export default App;
