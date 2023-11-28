import Main  from './Components/Main';
import './App.css';
import {BrowserRouter} from "react-router-dom"
import { Provider } from "react-redux";
import { Store } from './Redux/Store';


function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
