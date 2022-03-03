import React, {Component} from 'react';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
export default class HighScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalsTop10: [],
            flagsTop10: []
        }
    }

    handleHighScoresArrays() {
        axios
            .get('http://localhost:8080/api/getHighScores')
                .then(res => {
                    let animalsArray = res.data.animalsArray
                    animalsArray.forEach((item,i) => {
                        item.id = i + 1;
                    })
                    this.setState({animalsTop10: animalsArray})
                    let flagsArray = res.data.flagsArray
                    flagsArray.forEach((item,i) => {
                        item.id = i + 1;
                    })
                    this.setState({flagsTop10: flagsArray})
                })
    }

    componentDidMount() {
        this.handleHighScoresArrays()
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', margin: '30px 0 30px 30px'}}>Huippupisteet</h1>
                <Container fluid className={"top10container"}>
                    <Row className={"top10row"}>

                        <Col className={"top10col"}>
                            <p style={{fontSize: "30px"}}>🐶Eläimet🐱</p>
                            {this.state.animalsTop10.map((item) =>
                            <li key={item.id}>
                                <Row className={"top10itemRow"}>
                                    <Col className={"top10item"}>
                                        <p className={"top10name"}>{item.username}</p>
                                        <p className={"top10score"}>{item.score}</p>
                                    </Col>
                                </Row>
                            </li>
                        )}</Col>

                        <Col className={"top10col"}>
                            <p style={{fontSize: "30px"}}>🏴Liput🏳️</p>
                            {this.state.flagsTop10.map((item) =>
                                <Row className={"top10itemRow"}>
                                    <Col className={"top10item"}>
                                        <p className={"top10name"}>{item.username}</p>
                                        <p className={"top10score"}>{item.score}</p>
                                    </Col>
                                </Row>
                            )}</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}