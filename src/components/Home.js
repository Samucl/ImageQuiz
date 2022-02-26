import React, {Component} from 'react';
export default class Home extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className={"homeDiv divOpacity"}>
                <h1 style={{color: 'White'}}>Etusivu</h1>
            </div>
        )
    }
}