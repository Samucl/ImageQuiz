import React, {Component} from 'react';
import logo from '../res/testlogo.png';
import {Navbar, Form, Button, Alert, Container, Nav} from 'react-bootstrap'
import {CSSTransition} from "react-transition-group";
import {Link} from "react-router-dom";
import axios from "axios";
export default class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginShown: false,
            isRegisterShown: false,
            validated: false,
            formError: false,
            formSuccess: false,
            alertMessage: '',
            email: '',
            password: '',
            password2: '',
            username: '',
        }
        this.handleisLoginShown = this.handleisLoginShown.bind(this);
        this.handleisRegisterShown = this.handleisRegisterShown.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleStatusReset = this.handleStatusReset.bind(this)
        this.handleFormReset = this.handleFormReset.bind(this)
    }

    async handleLogin(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({validated: true})
        if(form.checkValidity() === false){
            return
        }
        const user = { email: this.state.email, password: this.state.password }
        axios
            .post('http://localhost:8080/api/login', user)
            .then(res => {
                if (res.status === 202){
                    this.setState({alertMessage: 'Kirjauduttu sisään'})
                    this.setState({formSuccess: true})
                    localStorage.setItem("myToken", res.data.accessToken)
                    localStorage.setItem("username", res.data.username)
                    this.props.changeDisplayUsername(res.data.username)
                    this.props.changeIsLogged(true)
                    this.handleFormReset(event)
                    this.handleStatusReset()
                    this.handleisLoginShown()
                }
                else {
                    this.setState({alertMessage: 'Väärä tunnus tai salasana'})
                    this.setState({formError: true})
                }
            })
    }

    async handleRegister(event){
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false)
            event.stopPropagation();
        this.setState({validated: true})
        if(form.checkValidity() === false)
            return
        if(this.state.password !== this.state.password2){
            this.setState({alertMessage: 'Salasanat eivät täsmää'})
            this.setState({formError: true})
            return
        }
        const user = { email: this.state.email, password: this.state.password, username: this.state.username }
        axios
            .post('http://localhost:8080/api/register', user)
            .then(res => {
                if (res.status === 202){
                    this.setState({alertMessage: 'Rekisteröity sisään'})
                    this.setState({formSuccess: true})
                    this.handleFormReset(event)
                } else if (res.status === 203) {
                    this.setState({alertMessage: 'Sähköposti käytössä'})
                    this.setState({formError: true})
                } else if (res.status === 205) {
                    this.setState({alertMessage: 'Käyttäjänimi käytössä'})
                    this.setState({formError: true})
                } else if (res.status === 204) {
                    this.setState({alertMessage: 'Ongelma rekisteröinnissä'})
                    this.setState({formError: true})
                }
            })
    }

    handleLogout() {
        localStorage.removeItem("myToken")
        localStorage.removeItem("username")
        this.props.changeDisplayUsername('')
        this.props.changeIsLogged(false)
    }

    handleFormReset(event) {
        event.target.reset();
        this.setState({validated: false})
        this.setState({email: ''})
        this.setState({password: ''})
        this.setState({password2: ''})
        this.setState({username: ''})
    }

    handleisLoginShown() {
        if(this.state.isLoginShown)
            this.setState({isLoginShown: false})
        else{
            this.setState({isLoginShown: true})
            this.setState({isRegisterShown: false})
        }
    }
    handleisRegisterShown() {
        if(this.state.isRegisterShown)
            this.setState({isRegisterShown: false})
        else{
            this.setState({isRegisterShown: true})
            this.setState({isLoginShown: false})
        }
    }

    handleStatusReset () {
        this.setState({formError: false})
        this.setState({formSuccess: false})
        this.setState({alertMessage: ''})
    }

    handleEmailChange(e) {
        this.handleStatusReset()
        this.setState({email: e.target.value})
    }
    handlePasswordChange(e) {
        this.handleStatusReset()
        this.setState({password: e.target.value})
    }
    handlePassword2Change(e) {
        this.handleStatusReset()
        this.setState({password2: e.target.value})
    }
    handleUsernameChange(e) {
        this.handleStatusReset()
        this.setState({username: e.target.value})
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="sm" bg="light" variant="light" className={"topbar"}>
                    <Container fluid>
                        <Navbar.Brand><Link to="/"><img src={logo} alt={"logo"}/></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"> </Nav>
                            {this.props.isLogged ?
                            <Nav>
                                <Link to="/"><button id={"logoutButton"} className={"order-sm-1"} onClick={this.handleLogout}>Kirjaudu ulos</button></Link>
                            </Nav>
                                : <Nav>
                                    <button onClick={this.handleisLoginShown}>Kirjaudu</button>
                                    <button onClick={this.handleisRegisterShown}>Rekisteröidy</button>
                                </Nav>}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <CSSTransition in={this.state.isLoginShown} unmountOnExit timeout={400} classNames="slide">
                <div className={"formdiv"}>
                    <Form noValidate onSubmit={this.handleLogin} validated={this.state.validated}>
                        <h3>Kirjaudu sisään</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sähköposti</Form.Label>
                            <Form.Control type="email" placeholder="Sähköposti" value={this.state.email} onChange={e => this.handleEmailChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className={"subButton"}>Kirjaudu</Button>
                    </Form>
                    {this.state.formSuccess ? <Alert variant={"success"}>{this.state.alertMessage}</Alert> : null}
                    {this.state.formError ? <Alert variant={"danger"}>{this.state.alertMessage}</Alert> : null}
                </div>
                </CSSTransition>

                <CSSTransition in={this.state.isRegisterShown} unmountOnExit timeout={400} classNames="slide">
                <div className={"formdiv"}>
                    <Form noValidate onSubmit={this.handleRegister} validated={this.state.validated}>
                        <h3>Rekisteröidy</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sähköposti</Form.Label>
                            <Form.Control type="email" placeholder="Sähköposti" value={this.state.email} onChange={e => this.handleEmailChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Käyttäjätunnus</Form.Label>
                            <Form.Control type="text" placeholder="Käyttäjätunnus" value={this.state.username} onChange={e => this.handleUsernameChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana uudelleen</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password2} onChange={e => this.handlePassword2Change(e)} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className={"subButton"}>Kirjaudu</Button>
                    </Form>
                    {this.state.formSuccess ? <Alert variant={"success"}>{this.state.alertMessage}</Alert> : null}
                    {this.state.formError ? <Alert variant={"danger"}>{this.state.alertMessage}</Alert> : null}
                </div>
                </CSSTransition>
                {this.props.isLogged && !this.props.showSidebar ?<button className={"dropButton"} onClick={() => this.props.changeShowSidebar(!this.props.showSidebar)}>☰</button>: null}
            </div>

        )
    }
}