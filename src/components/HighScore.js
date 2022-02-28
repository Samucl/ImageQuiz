import React, {Component} from 'react';
import axios from "axios";
export default class HighScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleAnimalScoresArray() {
        axios
            .get('http://localhost:8080/api/getAnimalScores')
                .then(res => {

                })
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', padding: '50px'}}>Huippupisteet</h1>
            </div>
        )
    }
}