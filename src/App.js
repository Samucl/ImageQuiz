import './App.css';
import TopBar from "./components/TopBar";
import Game from "./components/Game";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from "./components/Home";
import {useEffect, useState} from "react";
import axios from "axios";
import SideBar from "./components/SideBar";
import {Col, Container, Row} from "react-bootstrap";
import {CSSTransition} from "react-transition-group";
import HighScore from "./components/HighScore";

function App() {

    const [username, setUsername] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        if(tokenJson!=null){
            axios
                .post('http://localhost:8080/api/checkUsername', ' ',
                    { headers: {Authorization: 'Bearer: ' + tokenJson}})
                .then(res => {
                    setUsername(res.data)
                    setIsLogged(true);
                })
                .catch(() => {
                    //Tyhjennetään Local Storage, jos jwt token on vanhentunut.
                    localStorage.removeItem("myToken");
                    localStorage.removeItem("username");
                })
        }
    })


    //Komponenttien props muuttujien handler-funktiot
    const handleIsLogged = (isLoggedFromTopBar) => { setIsLogged(isLoggedFromTopBar) }
    const handleDisplayUsername = (DisplayUsernameFromTopBar) => { setUsername(DisplayUsernameFromTopBar) }
    const handleShowSidebar = (showSidebarFromTopBar) => { setShowSidebar(showSidebarFromTopBar) }

    return (
        <div className="container-fluid no-padding">
            <Router>
                <TopBar isLogged={isLogged} changeIsLogged={handleIsLogged} changeDisplayUsername={handleDisplayUsername} showSidebar={showSidebar} changeShowSidebar={handleShowSidebar}/>
                <Container fluid className={"switchContainer"}>
                    <Row className={"rows"}>
                        <CSSTransition in={isLogged && showSidebar} unmountOnExit timeout={400} classNames="slideSide">
                            <Col className={"sidebarCol"} sm={"auto"} xs={3} >
                            <SideBar username={username} showSidebar={showSidebar} changeShowSidebar={handleShowSidebar}/>
                        </Col>
                        </CSSTransition>
                        <CSSTransition in={isLogged && showSidebar} timeout={400} classNames="opacityTransition">
                        <Col className={"switchCol"}>
                            <Switch>
                                <Route path="/game">
                                    <Game />
                                </Route>
                                <Route path="/highscores">
                                    <HighScore />
                                </Route>
                                <Route path="/">
                                    <Home username={username}/>
                                </Route>
                            </Switch>
                        </Col>
                        </CSSTransition>
                    </Row>
                </Container>
            </Router>
        </div>
     );
}

export default App;
