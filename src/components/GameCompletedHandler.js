import React, {Component} from 'react';
export default class GameCompletedHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.completed();
    }

    render() {
        return (
            <div> </div>
        )
    }
}