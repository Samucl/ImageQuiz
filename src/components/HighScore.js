import React, {Component} from 'react';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
export default class HighScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalsTop10: [
                    {id: 1, score: 10, username: "TESTT"},
                    {id: 2, score: 15, username: "TESTT"},
                    {id: 3, score: 20, username: "TESTT"}],
            animalsListItems: ''
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
                <Container fluid>
                    <Row className={"top10row"}>
                        <Col sm={5} className={"top10col"}>
                            <p>TESTT</p>
                            {this.state.animalsTop10.map((item) =>
                            <li key={item.id}>
                                {item.username} : {item.score}
                            </li>
                        )}</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}