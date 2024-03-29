import React, {Component} from 'react';
import axios from "axios";
import {Button, Container, Image} from 'react-bootstrap'
import tempimg from '../res/tempimg.png';
import Countdown from "react-countdown";
import GameCompletedHandler from "./GameCompletedHandler";
import GameSelection from "./GameSelection";
export default class Game extends Component {

    constructor(props) {
        super(props);
        //Date tallennettava stateen. Muuten countdownin aika resetoituu aina kun setState kutsutaan.
        let date = Date.now() + 60000;
        this.state = {
            isButtonSelected: false,
            isNewLevel: false,
            isGameSelected: false,
            isGameStart: false,
            isGameEnd: false,
            isEffects: true,
            item: '',
            expirationDate: date,
            seconds: '',
            img: tempimg,
            effectClass: '',
            points: 0,
            xp: 0,
            displayPoints: 0,
            names: [],
            buttonClasses: ['light','light','light','light','light','light','light','light',],
            game: '',
            gameName: ''
        }
        this.getImage = this.getImage.bind(this);
        this.renderer = this.renderer.bind(this);
        this.handleIsGameStart = this.handleIsGameStart.bind(this);
        this.handleIsGameEnd = this.handleIsGameEnd.bind(this);
        this.checkButton = this.checkButton.bind(this);
        this.handleExpirationDate = this.handleExpirationDate.bind(this);
        this.randomEffect = this.randomEffect.bind(this);
        this.resetEffects = this.resetEffects.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.completed = this.completed.bind(this);
        this.handleIsGameSelected = this.handleIsGameSelected.bind(this);
        this.disableEffects = this.disableEffects.bind(this);
        this.handleNewLevel = this.handleNewLevel.bind(this);
    }

    disableEffects() {
        this.setState({isEffects: false})
    }

    handleIsGameSelected(name) {
        this.setState({isGameSelected: true})
        this.setState({game: name})
        if(name === 'Animals'){
            this.setState({gameName: 'Eläimet'})
        } else if (name === 'Flags'){
            this.setState({gameName: 'Liput'})
        }
    }

    handleIsGameStart() {
        this.setState({isGameStart: !this.state.isGameStart})
        this.setState({points: 0})
    }

    handleIsGameEnd() {
        this.setState({isNewLevel: false})
        this.setState({isGameEnd: !this.state.isGameEnd})
    }

    handleExpirationDate() {
        this.setState({expirationDate: Date.now() + 60000})
    }

    getImage() {
        if(this.state.isGameEnd){
            this.handleIsGameEnd()
        }
        if(!this.state.isGameStart){
            this.handleIsGameStart()
            this.handleExpirationDate()
        }
        this.resetEffects()
         axios
             .get('http://localhost:8080/api/get' + this.state.game)
             .then(res =>{
                 this.setState({img: res.data.url})
                 this.setState({item: res.data.item})
                 this.setState({names: res.data.names})
             })
    }

    resetEffects() {
        this.setState({effectClass: ''});
    }

    randomEffect() {
        this.setState({isLoading: false})
        let classes = [...this.state.buttonClasses];
        for(let i = 0; i < classes.length; i++){
            classes[i] = 'light'
        }
        this.setState({buttonClasses: classes})
        this.setState({isButtonSelected: false})
        if(this.state.isGameStart && this.state.isEffects){
            let rand = Math.floor(Math.random() * 4);

            switch (rand) {
                case 0:
                    this.setState({effectClass: 'imgPanOut'});
                    break;
                case 1:
                    this.setState({effectClass: 'imgBlur'});
                    break;
                case 2:
                    this.setState({effectClass: 'imgSkew'})
                    break;
                case 3:
                    this.setState({effectClass: 'imgTranslate'})
                    break;
                default:
            }
        }
    }

    checkButton(int) {
        let classes = [...this.state.buttonClasses];
        if(!this.state.isButtonSelected){
            if(int === this.state.item){ //Jos kuva arvataan
                classes[int] = 'success'
                this.setState({buttonClasses: classes})
                this.getImage()
                this.setState({points: this.state.points + 10})
                this.setState({isButtonSelected: true})
            }
            else {
                classes[int] = 'danger'
                this.setState({buttonClasses: classes})
                if(this.state.points > 5)
                    this.setState({points: this.state.points - 5})
                else
                    this.setState({points: 0})
            }
        }
    }

    handleScore() {
        let points = { points: this.state.points }
        if(this.state.points !== 0){
            let tokenJson
            tokenJson = localStorage.getItem('myToken')

            axios
                .post('http://localhost:8080/api/score' + this.state.game, points,
                    { headers: {Authorization: 'Bearer: ' + tokenJson}})
                .then()
            axios
                .post('http://localhost:8080/api/setStats', points,
                    { headers: {Authorization: 'Bearer: ' + tokenJson}})
                .then()
        }
    }

    handleNewLevel() {
        let tokenJson
        tokenJson = localStorage.getItem('myToken')
        axios
            .get('http://localhost:8080/api/getStats',
                { headers: {Authorization: 'Bearer: ' + tokenJson}})
            .then(res => {
                this.setState({xp: res.data.xp})
                if(Math.floor(this.state.xp/100) < Math.floor((this.state.displayPoints + this.state.xp)/100)){
                    this.setState({isNewLevel: true})
                }
            })
    }

    completed() {
        this.setState({displayPoints: this.state.points})
        this.handleNewLevel()
        this.handleScore()
        this.handleIsGameEnd()
        this.handleIsGameStart()
        this.resetEffects()
    }

    renderer ({seconds, completed}) {
        if (completed) {
            return <GameCompletedHandler completed={this.completed} />;
        } else {
            return <h5>{seconds}s</h5>;
        }
    }

    render() {
        return (
            <div>
            {this.state.isGameSelected ?
            <Container fluid className="game divOpacity">
                <div className={"gameTimeContainer"}>
                    {this.state.isGameStart ?
                        <Countdown date={this.state.expirationDate} renderer={this.renderer}/>
                        : <h5>{this.state.gameName}</h5>}
                </div>
                <div className={"gameContainer"}>
                    {this.state.isGameEnd ?
                    <div className={"endDiv"}>
                        <h5>Pelin lopulliset pisteet</h5>
                        <h1>{this.state.displayPoints}</h1>
                        {this.state.isNewLevel ?
                        <h5 style={{color: "gold"}}>Saavutit seuraavan tason!</h5> : null}
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
                                    <td><Button onClick={() => this.checkButton(0)} className={"gameButton btn btn-" + this.state.buttonClasses[0]}>{this.state.names[0]}</Button></td>
                                    <td><Button onClick={() => this.checkButton(1)} className={"gameButton btn btn-" + this.state.buttonClasses[1]}>{this.state.names[1]}</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(2)} className={"gameButton btn btn-" + this.state.buttonClasses[2]}>{this.state.names[2]}</Button></td>
                                    <td><Button onClick={() => this.checkButton(3)} className={"gameButton btn btn-" + this.state.buttonClasses[3]}>{this.state.names[3]}</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(4)} className={"gameButton btn btn-" + this.state.buttonClasses[4]}>{this.state.names[4]}</Button></td>
                                    <td><Button onClick={() => this.checkButton(5)} className={"gameButton btn btn-" + this.state.buttonClasses[5]}>{this.state.names[5]}</Button></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={() => this.checkButton(6)} className={"gameButton btn btn-" + this.state.buttonClasses[6]}>{this.state.names[6]}</Button></td>
                                    <td><Button onClick={() => this.checkButton(7)} className={"gameButton btn btn-" + this.state.buttonClasses[7]}>{this.state.names[7]}</Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        : <div><Button className={"gameButton btn btn-light"} onClick={this.getImage}>Aloita peli</Button></div>}
                </div>
            </Container>: <GameSelection handleIsGameSelected={this.handleIsGameSelected} disableEffects={this.disableEffects}/>}
            </div>
        )
    }
}