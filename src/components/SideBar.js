import React, {Component} from 'react';
import {Link} from "react-router-dom";
import gitHubLogo from '../res/gitHubLogo.png';
export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={"sidebar"}>
                <button id={"dropButtonClose"} onClick={() => this.props.changeShowSidebar(!this.props.showSidebar)}>☰</button>
                <Link to="/game"><button>Pelit</button></Link>
                <Link to="/"><button>Huippupisteet</button></Link>
                <Link to="/"><button>Profiili</button></Link>
                <div className={"gitHubDiv"}>
                    <img src={gitHubLogo} alt={"GitHubLogo"}/>
                    <text>Samuel Laisaar</text>
                    <a href={"https://github.com/Samucl/ImageQuiz"}><button id={"gitHubButton"}>GitHub</button></a>
                </div>

            </div>
        )
    }
}