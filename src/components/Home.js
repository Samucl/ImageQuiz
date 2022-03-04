import React, {Component} from 'react';
import {Card, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={"homeDiv divOpacity"}>
                <Container fluid className={"homeContainer"}>

                    <Row>
                        <Card>
                            <Card.Body>👋 Tervetuloa {this.props.username}!</Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Header>7.3.2022</Card.Header>
                            <Card.Body>
                                <Card.Title>🎉Versio 1.0.0</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>2 peliä: Eläimet ja liput</li>
                                        <li>Huippupisteet lista, josta näet pelikategorioiden 10 parasta pelaajaa</li>
                                        <li>Peliedistymisen seuranta, jossa tiedot tasopisteistä sekä pelien määrästä</li>
                                        <li>Peliin lisätty saavutuksia parantamaan uudelleenpelattavuutta</li>
                                    </ul>
                                </Card.Text>
                                <Link to="/game"><button>Aloita pelaaminen</button></Link>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}