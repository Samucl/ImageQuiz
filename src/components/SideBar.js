import React, {Component} from 'react';
import {Link} from "react-router-dom";
import gitHubLogo from '../res/gitHubLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {OverlayTrigger, Popover} from "react-bootstrap";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xp: 0,
            gamesPlayed: 0,
        }
    }

    getStats() {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        if(tokenJson!=null){
            axios
                .post('http://localhost:8080/api/getStats', ' ',
                    { headers: {Authorization: 'Bearer: ' + tokenJson}})
                .then(res => {
                    this.setState({xp: res.data.xp})
                    this.setState({gamesPlayed: res.data.gamesPlayed})
                })
        }
    }

    render() {
        const taso = Math.floor(this.state.xp/100);
        const leftover = this.state.xp - (taso * 100)
        const profile = (
            <Popover id="popover-basic">
                <Popover.Header as="h1">💯 Tilastot 🤓</Popover.Header>
                <Popover.Body>
                    <div>
                        <div className={"xpBar"}>
                            <h6>Tasopisteet</h6>
                            <CircularProgressbar maxValue={100} value={leftover} text={`Taso ${taso}`} styles={buildStyles({
                                textSize: '17px',
                            })}/>
                            <h6 id={"remainingXp"} style={{marginTop: "15px"}}>Jäljellä {100 - leftover} pistettä</h6>
                        </div>
                        <div className={"playedGames"}>
                            <h5>Pelatut pelit {this.state.gamesPlayed}</h5>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        );

        return (
            <div className={"sidebar"}>
                <button id={"dropButtonClose"} onClick={() => this.props.changeShowSidebar(!this.props.showSidebar)}>☰</button>
                <div id={"usernameText"}>
                    <FontAwesomeIcon icon={faUser} />
                    <p>{this.props.username}</p>
                </div>
                <Link to="/game"><button>Pelit</button></Link>
                <Link to="/highscores"><button>Huippupisteet</button></Link>
                <OverlayTrigger trigger="click" placement="right" overlay={profile}>
                <button onClick={() => this.getStats()}>Tilastot</button>
                </OverlayTrigger>
                <Link to="/achievements"><button>Saavutukset</button></Link>
                <div className={"gitHubDiv"}>
                    <img src={gitHubLogo} alt={"GitHubLogo"}/>
                    <text>Samuel Laisaar</text>
                    <a href={"https://github.com/Samucl/ImageQuiz"}><button id={"gitHubButton"}>GitHub</button></a>
                </div>
            </div>
        )
    }
}