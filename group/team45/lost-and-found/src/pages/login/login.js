import React from "react"
import './login.css'
import { Redirect } from 'react-router-dom';

const API_HOST = 'http://localhost:5000'
class Login extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        link: "/login",
        submit: false
    }

    render() {
        const { app } = this.props

        const update = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;


            this.setState({
                [name]: value
            });
        }

        const submit = () => {
            const request = new Request(`${API_HOST}/login`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            });

            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then((info) => {
                    if (info === undefined) {
                        this.setState({ link: "/login", submit: false })
                    } else {
                        if (info.email === "admin@mail.com"){
                            this.setState({ link: "/admin/user", submit: true })
                        } else {
                            this.setState({ link: "/display", submit: true })
                            app.setState({
                                id: info._id,
                                username: info.name,
                                email: info.email,
                                password: info.password,
                                losts: info.posts,
                                founds: info.founds,
                                requests: info.requests 
    
                              });
                        }
                        
                        app.setState({
                            id: info._id,
                            username: info.name,
                            email: info.email,
                            password: info.password,
                            founds: info.founds,
                            requests: info.requests

                        });
                        console.log(info)
                        getUserInfo(info._id);
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        }
        const getUserInfo = (id) => {
            const request = new Request(`${API_HOST}/user/info`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: id
                }),
            });
    
            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(info => {
                    app.setState({
                        losts: info.lost_result,
                        founds: info.found_result,
                        request: info.requests
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            
    
        }
        const signup = () => {
            const request = new Request(`${API_HOST}/signup`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                }),
            });

            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then((info) => {
                    if(info === undefined) {
                        this.setState({ link: "/login", submit: false })
                    } else {
                        this.setState({ link: "/display", submit: true })
                        app.setState({
                            id: info._id,
                            username: info.name,
                            email: info.email,
                            password: info.password,
                            losts: info.posts,
                            founds: info.founds,
                            requests: info.requests 

                          });
                          console.log(app.state)
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                });

        }

        if (this.state.submit) {
            return <Redirect to={this.state.link} />
        }

        return (
            <div className="main" id="main">

                <div className="form-container sign-up-container">
                    <form>
                        <h1 id="loginHeader">Sign Up</h1>
                        <span>Join Us Now</span>
                        <input type="text" placeholder="name" onChange={update} name="name"/>
                        <input type="email" placeholder="email" onChange={update} name="email" />
                        <input type="password" placeholder="password" onChange={update} name="password"/>
                        <button id="login" onClick={signup}>Sign up now</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form>
                        <h1 id="loginHeader">Sign In</h1>
                        <span>Use current account</span>
                        <input type="email" placeholder="email" onChange={update} name="email" />
                        <input type="password" placeholder="password" onChange={update} name="password" />
                        <div id="login" onClick={submit} >Log in now</div>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 id="signupHeader">Do not have account yet?</h1>
                            <p id="para">Join us now!</p>
                            <button className="ghost" id="signUp" onClick={() => {
                                document.getElementById('main').classList.add('right-panel-active')
                            }}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;