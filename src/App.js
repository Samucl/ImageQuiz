import './App.css';
import TopBar from "./components/TopBar";
import Game from "./components/Game";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./components/Home";

function App() {

    return (
        <div className="container-fluid no-padding">
            <Router>
                <TopBar/>
                <Switch>
                    <Route path="/game">
                        <Game />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
     );
}

export default App;
