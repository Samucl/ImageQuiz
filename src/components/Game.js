import React, {Component} from 'react';
import axios from "axios";
import {Button, Container, Image} from 'react-bootstrap'
import tempimg from '../res/tempimg.png';
import Countdown from "react-countdown";
export default class Game extends Component {

    constructor() {
        super();
        //Date tallennettava stateen. Muuten countdownin aika resetoituu aina kun setState kutsutaan.
        let date = Date.now() + 60000;
        this.state = {
            isGameStart: false,
            isGameEnd: false,
            item: '',
            expirationDate: date,
            seconds: '',
            img: tempimg,
            effectClass: '',
            points: 0,
        }
        this.getImage = this.getImage.bind(this);
        this.renderer = this.renderer.bind(this);
        this.handleIsGameStart = this.handleIsGameStart.bind(this);
        this.handleIsGameEnd = this.handleIsGameEnd.bind(this);
        this.checkButton = this.checkButton.bind(this);
        this.handleExpirationDate = this.handleExpirationDate.bind(this);
        this.randomEffect = this.randomEffect.bind(this);
        this.resetEffects = this.resetEffects.bind(this);
    }

    handleIsGameStart() {
        this.setState({isGameStart: !this.state.isGameStart})
        this.setState({points: 0})
    }

    handleIsGameEnd() {
        this.setState({isGameEnd: !this.state.isGameEnd})
    }

    handleExpirationDate() {
        this.setState({expirationDate: Date.now() + 60000})
    }

    getImage() {
        if(this.state.isGameEnd)
            this.handleIsGameEnd()
        if(!this.state.isGameStart){
            this.handleIsGameStart()
            this.handleExpirationDate()
        }
        this.resetEffects()
         axios
             .get('http://localhost:8080/api/getAnimal')
             .then(res =>{
                 this.setState({img: res.data.url})
                 this.setState({item: res.data.item})
             })
    }

    resetEffects() {
        this.setState({effectClass: ''});
    }

    randomEffect() {
        if(this.state.isGameStart){
            let rand = Math.floor(Math.random() * 2);

            switch (rand) {
                case 0:
                    this.setState({effectClass: 'imgPanOut'});
                    break;
                case 1:
                    this.setState({effectClass: 'imgBlur'});
                    break;
                case 2:
                    //TODO
                    break;
                default:
            }
        }
    }

    checkButton(int) {
        console.log(int)
        if(int === this.state.item){ //Jos kuva arvataan
            this.getImage()
            this.setState({points: this.state.points + 10})
        }
        else {
            if(this.state.points > 5)
                this.setState({points: this.state.points - 5})
            else
                this.setState({points: 0})
        }
    }

    renderer ({seconds, completed}) {
        if (completed) {
            this.handleIsGameEnd() //TODO: Käytä loppuruudun näkymiseen (Ei tee vielä mitään)
            this.handleIsGameStart()
            this.resetEffects()
            return null
        } else {
            return <h5>{seconds}s</h5>;
        }
    }

    render() {
        return (
            <Container fluid className="game divOpacity">
                <div className={"gameTimeContainer"}>
                    {this.state.isGameStart ?
                        <Countdown date={this.state.expirationDate} renderer={this.renderer}/>
                        : null}
                </div>
                <div className={"gameContainer"}>
                    {this.state.isGameEnd ?
                    <div className={"endDiv"}>
                        <h5>Pelin lopulliset pisteet</h5>
                        <h1>{this.state.points}</h1>
                    </div> : null}
                    {this.state.isGameStart ?
                    <div className={"pointsContainer"}>
                        <h5>Pisteet: {this.state.points}</h5>
                    </div> : null}
                    <div className={"gameImageContainer"}>
                        <Image fluid src={this.state.img} alt={"GameImage"} className={"gameImage " + this.state.effectClass} onLoad={() => this.randomEffect()}/>
                    </div>
                    {this.state.isGameStart ?
                        <div className={"gameButtonContainer"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(0)} className="gameButton btn btn-light">Kissa</Button></td>
                                    <td><Button onClick={() => this.checkButton(1)} className="gameButton btn btn-light">Koira</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(2)} className="gameButton btn btn-light">Kani</Button></td>
                                    <td><Button onClick={() => this.checkButton(3)} className="gameButton btn btn-light">Ankka</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(4)} className="gameButton btn btn-light">Kettu</Button></td>
                                    <td><Button onClick={() => this.checkButton(5)} className="gameButton btn btn-light">Lisko</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(6)} className="gameButton btn btn-light">Koala</Button></td>
                                    <td><Button onClick={() => this.checkButton(7)} className="gameButton btn btn-light">Panda</Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        : <div><Button className="gameButton btn btn-light" onClick={this.getImage}>Aloita peli</Button></div>}
                </div>
            </Container>
        )
    }
}