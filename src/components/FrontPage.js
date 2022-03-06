import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import gamepanels from "../res/GamePanels.png"
import logo from "../res/testlogo.png"
export default class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"divOpacity frontpagediv"}>
                <Container fluid className={"frontpagecontainer"}>
                    <Row>
                        <Col className={"fontpagecol1"}>
                            <img src={gamepanels} alt={"GameImage"} id={"frontpagegame"}/>
                        </Col>
                        <Col className={"fontpagecol2"}>
                            <img src={logo} alt={"Logo"} id={"frontpagelogo"}/>
                            <h3>Hauskoja kuvanarvauspelejä</h3>
                            <p>Pelaa muita vastaan ja kilpaile paikasta huippupelaajien listoilla</p>
                            <p>Ansaitse saavutuksia ja kerää kehityspisteitä</p>
                            <button onClick={this.props.handleIsRegisterShown}>Pelaa ilmaiseksi</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}