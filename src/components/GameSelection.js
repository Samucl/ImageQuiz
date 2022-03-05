import React, {Component} from 'react';
import {Card, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import axios from "axios";
export default class GameSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalsScore: 0,
            flagsScore: 0
        }
    }

    handleGameSettings(name, disableEffects){
        this.props.handleIsGameSelected(name)
        if(disableEffects)
            this.props.disableEffects();
    }

    componentDidMount() {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        axios
            .post('http://localhost:8080/api/getPersonalScores', ' ',
                { headers: {Authorization: 'Bearer: ' + tokenJson}})
            .then(res =>{
                this.setState({animalsScore: res.data.animalsScore})
                this.setState({flagsScore: res.data.flagsScore})
            })
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', margin: '30px 0 30px 30px'}}>Valitse peli</h1>
                <Container fluid>
                    <Row className={"gamesrow"} onClick={() => this.handleGameSettings('Animals', false)}>
                        <OverlayTrigger placement={"top"}  overlay={
                                <Tooltip>Ennätys <strong>{this.state.animalsScore}</strong></Tooltip>
                            }>
                            <Card className={"btn-grad animalsButton"}>
                                <Card.Body><p>🐶Eläimet🐱</p></Card.Body>
                            </Card>
                        </OverlayTrigger>
                    </Row>

                    <Row className={"gamesrow"} onClick={() => this.handleGameSettings('Flags', true)}>
                        <OverlayTrigger placement={"top"}  overlay={
                            <Tooltip>Ennätys <strong>{this.state.flagsScore}</strong></Tooltip>
                        }>
                            <Card className={"btn-grad flagsButton"}>
                                <Card.Body><p>🏴Liput🏳️</p></Card.Body>
                            </Card>
                        </OverlayTrigger>
                    </Row>
                </Container>
            </div>
        )
    }
}