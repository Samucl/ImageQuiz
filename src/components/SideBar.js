import React, {Component} from 'react';
import {Link} from "react-router-dom";
import gitHubLogo from '../res/gitHubLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {OverlayTrigger, Popover} from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xp: 0,
        }
    }

    getXp() {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        if(tokenJson!=null){
            axios
                .post('http://localhost:8080/api/getXp', ' ',
                    { headers: {Authorization: 'Bearer: ' + tokenJson}})
                .then(res => {
                    this.setState({xp: res.data.xp})
                })
        }
    }

    render() {

        const taso = Math.floor(this.state.xp/100);

        const profile = (
            <Popover id="popover-basic">
                <Popover.Header as="h3"><FontAwesomeIcon icon={faUser} /> {this.props.username}</Popover.Header>
                <Popover.Body>
                    <p>Tasopisteet</p>
                    <CircularProgressbar value={100} text={`Taso ${taso}`}/>;
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
                <button onClick={() => this.getXp()}>Profiili</button>
                </OverlayTrigger>
                <div className={"gitHubDiv"}>
                    <img src={gitHubLogo} alt={"GitHubLogo"}/>
                    <text>Samuel Laisaar</text>
                    <a href={"https://github.com/Samucl/ImageQuiz"}><button id={"gitHubButton"}>GitHub</button></a>
                </div>

            </div>
        )
    }
}