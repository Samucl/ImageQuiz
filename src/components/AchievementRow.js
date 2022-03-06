import React, {Component} from 'react';
import {Card, ProgressBar, Row} from "react-bootstrap";
export default class AchievementRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false,
        }
    }

    render() {
        return (
            <div className={"divOpacity"}>
                <Row className={"achievementsrow"}>
                    <Card style={{filter: `hue-rotate(${this.props.deg}deg)`}}>
                        {this.props.now >= this.props.max ?
                        <Card.Header>{this.props.header} ✔️</Card.Header>
                            : <Card.Header>{this.props.header}</Card.Header> }
                            <Card.Body>
                                <Card.Text>
                                    <ProgressBar now={this.props.now} max={this.props.max} label={this.props.label}/>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                </Row>
            </div>
        )
    }
}