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
                <h1 style={{color: 'White', padding: '50px'}}>Etusivu</h1>
            </div>
        )
    }
}