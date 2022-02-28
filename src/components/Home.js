import React, {Component} from 'react';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={"homeDiv divOpacity"}>
                <h1 style={{color: 'White', padding: '50px'}}>Tervetuloa {this.props.username}</h1>
            </div>
        )
    }
}