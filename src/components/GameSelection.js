import React, {Component} from 'react';
import {Container, Navbar, Row} from "react-bootstrap";
import AnimalsBg from '../res/AnimalsBg.jpg';
import FlagsBg from '../res/FlagsBg.jpg';
export default class GameSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleGameSettings(name, disableEffects){
        this.props.handleIsGameSelected(name)
        if(disableEffects)
            this.props.disableEffects();
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', margin: '30px 0 30px 30px'}}>Valitse peli</h1>
                <Container fluid>
                    <Row className={"animalsrow"} onClick={() => this.handleGameSettings('Animals', false)} style={{
                        backgroundImage: `url(${AnimalsBg})`
                    }}>
                        <Navbar>
                            <Container fluid>
                                <p>Eläimet</p>
                                <Navbar.Toggle />
                            </Container>
                        </Navbar>
                    </Row>

                    <Row className={"animalsrow"} onClick={() => this.handleGameSettings('Flags', true)} style={{
                        backgroundImage: `url(${FlagsBg})`
                    }}>
                        <Navbar>
                            <Container fluid>
                                <p>Liput</p>
                                <Navbar.Toggle />
                            </Container>
                        </Navbar>
                    </Row>
                </Container>
            </div>
        )
    }
}