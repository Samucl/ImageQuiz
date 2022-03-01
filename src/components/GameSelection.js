import React, {Component} from 'react';
import {Container, Navbar, Row} from "react-bootstrap";
import AnimalsBg from '../res/AnimalsBg.jpg';
export default class GameSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <h1 style={{color: 'White', margin: '30px 0 30px 30px'}}>Valitse peli</h1>
                <Container fluid>
                    <Row className={"animalsrow"} onClick={() => this.props.handleIsGameSelected('Animals')} style={{
                        backgroundImage: `url(${AnimalsBg})`
                    }}>
                        <Navbar>
                            <Container fluid>
                                <p>Eläimet</p>
                                <Navbar.Toggle />
                                <button>Top10</button>
                            </Container>
                        </Navbar>
                    </Row>

                    <Row className={"animalsrow"} onClick={() => this.props.handleIsGameSelected('Animals')}>
                        <Navbar>
                            <Container fluid>
                                <p>Tulossa pian</p>
                                <Navbar.Toggle />
                            </Container>
                        </Navbar>
                    </Row>
                </Container>
            </div>
        )
    }
}