import React from "react";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import ProfilePic from '../photos/Naruto.jpg';

import "./style.css";

class Header extends React.Component {
    state = {
        logout: false
    }
    render() {
        const { app } = this.props

        const logout = () => {
            this.setState({ logout: true})
            app.setState({
                id: "",
                username: "",
                email: "",
                password: "",
                losts: [],
                founds: [],
                requests:[]

              });
        }
        if(this.state.logout) {
            return <Redirect to="/login"  />
        }
        return (
            <div>
                <div id="header">
                    <Link to='/display'><h1 className='logo'>MyTrans Lost & Found</h1></Link>
                    <div className='logoutButton'>
                        <Button variant="outlined" onClick={logout}>logout</Button>
                    </div>
                    <Link to='/profile' className='headerProfile'><img className='headerProfilePic' src={ProfilePic} alt="profile"/></Link>
                </div>
            </div>
        );
    }
}

export default Header;