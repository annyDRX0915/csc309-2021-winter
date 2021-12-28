import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

import "./style.css";

class AdminHeader extends React.Component {
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
                    <h1 className='logo'>MyTrans Lost & Found (Admin)</h1>
                    <div className='logoutButton'>
                        <Button variant="outlined" onClick={logout}>logout</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHeader;