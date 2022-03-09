import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import AchievementRow from "./AchievementRow";
import axios from "axios";
export default class Achievements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalsScore: 0,
            flagsScore: 0,
            gamesPlayed: 0,
            xp: 0,
            level: 0,
        }
    }

    componentDidMount() {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        axios
            .get('http://localhost:8080/api/getPersonalScores',
                { headers: {Authorization: 'Bearer: ' + tokenJson}})
            .then(res =>{
                console.log( res.data.animalsScore)
                this.setState({animalsScore: res.data.animalsScore})
                this.setState({flagsScore: res.data.flagsScore})
            })
        axios
            .get('http://localhost:8080/api/getStats',
                { headers: {Authorization: 'Bearer: ' + tokenJson}})
            .then(res => {
                this.setState({xp: res.data.xp})
                this.setState({gamesPlayed: res.data.gamesPlayed})
                this.setState({level: Math.floor(res.data.xp/100)})
            })
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', margin: '30px 0 30px 30px'}}>Saavutukset</h1>
                <Container fluid className={"achievementsdiv"}>
                    <AchievementRow deg={-30} header={"Pelaa ensimmäinen peli"} now={this.state.gamesPlayed} max={1} label={`${this.state.gamesPlayed}/1`}/>
                    <AchievementRow deg={0} header={"Pelaa 20 peliä"} now={this.state.gamesPlayed} max={20} label={`${this.state.gamesPlayed}/20`}/>
                    <AchievementRow deg={30} header={"Pelaa 50 peliä"} now={this.state.gamesPlayed} max={50} label={`${this.state.gamesPlayed}/50`}/>
                    <AchievementRow deg={60} header={"Hanki 50 pisteen ennätys pelissä: Eläimet"} now={this.state.animalsScore} max={50} label={`${this.state.animalsScore}/50`}/>
                    <AchievementRow deg={90} header={"Hanki 50 pisteen ennätys pelissä: Liput"} now={this.state.flagsScore} max={50} label={`${this.state.flagsScore}/50`}/>
                    <AchievementRow deg={110} header={"Saavuta taso 5"} now={this.state.level} max={5} label={`${this.state.level}/5`}/>
                    <AchievementRow deg={140} header={"Saavuta taso 10"} now={this.state.level} max={10} label={`${this.state.level}/10`}/>
                    <AchievementRow deg={170} header={"Saavuta taso 20"} now={this.state.level} max={20} label={`${this.state.level}/20`}/>
                </Container>
            </div>
        )
    }
}