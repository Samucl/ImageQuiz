import React, {Component} from 'react';
import logo from '../res/testlogo.png';
import {Navbar, Form, Button, Alert, Container, Nav, NavDropdown} from 'react-bootstrap'
import {CSSTransition} from "react-transition-group";
import {Link} from "react-router-dom";
import axios from "axios";
export default class TopBar extends Component {

    constructor() {
        super();
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
            formRef: null,
        }
        this.handleisLoginShown = this.handleisLoginShown.bind(this);
        this.handleisRegisterShown = this.handleisRegisterShown.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
                    this.setState({formSuccess: true})
                    console.log(res.data)
                    localStorage.setItem("myToken", JSON.stringify(res.data))
                    localStorage.setItem("username", user.email)
                }
                else if (res.status === 206)
                    this.setState({formError: true})
            })

        this.handleFormReset(event)
    }

    handleFormReset(event) {
        event.target.reset();
        this.setState({validated: false})
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
    }

    handleEmailChange(email) {
        this.handleStatusReset();
        this.setState({email: email})
        console.log(this.state.email)
    }
    handlePasswordlChange(password) {
        this.handleStatusReset();
        this.setState({password: password})
        console.log(this.state.password)
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={"topbar"}>
                    <Container fluid>
                        <Navbar.Brand><Link to="/"><img src={logo} alt={"logo"}/></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/game" className={"navLinks"}>Peliin</Link>
                            </Nav>
                            <Nav>
                                <button onClick={this.handleisLoginShown}>Kirjaudu</button>
                                <button onClick={this.handleisRegisterShown}>Rekisteröidy</button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <CSSTransition in={this.state.isLoginShown} unmountOnExit timeout={400} classNames="slide">
                <div className={"formdiv"}>
                    <Form noValidate ref={this.state.formRef} onSubmit={this.handleLogin} validated={this.state.validated}>
                        <h3>Kirjaudu sisään</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sähköposti</Form.Label>
                            <Form.Control type="email" placeholder="Sähköposti" value={this.state.email} onChange={() => this.handleEmailChange(this.state.password)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={() => this.handlePasswordlChange(this.state.password)} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className={"subButton"}>Kirjaudu</Button>
                    </Form>
                    {this.state.formSuccess ? <Alert variant={"success"}>{this.state.alertMessage}</Alert> : <div> </div>}
                    {this.state.formError ? <Alert variant={"danger"}>{this.state.alertMessage}</Alert> : <div> </div>}
                </div>
                </CSSTransition>

                <CSSTransition in={this.state.isRegisterShown} unmountOnExit timeout={400} classNames="slide">
                <div className={"formdiv"}>
                    <Form>
                        <h3>Rekisteröidy</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sähköposti</Form.Label>
                            <Form.Control type="email" placeholder="Sähköposti" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Käyttäjätunnus</Form.Label>
                            <Form.Control type="text" placeholder="Käyttäjätunnus" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salasana uudelleen</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className={"subButton"}>Kirjaudu</Button>
                    </Form>
                    {this.state.formSuccess ? <Alert variant={"success"}>{this.state.alertMessage}</Alert> : <div> </div>}
                    {this.state.formError ? <Alert variant={"danger"}>{this.state.alertMessage}</Alert> : <div> </div>}
                </div>
                </CSSTransition>
            </div>

        )
    }
}