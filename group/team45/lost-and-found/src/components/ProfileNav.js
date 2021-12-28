import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Header from "./header";
class ProfileNav extends React.Component {
    render() {
        return (
            <div>
                <ul id="navBarContainer">
                    <li><Link to="/profile" id="first">Profile</Link></li>
                    <li><Link to="/profile/lost">Lost</Link></li>
                    <li><Link to="/profile/found">Found</Link></li>
                    <li><Link to="/profile/request">Requests</Link></li>
                </ul>
                
                <Header app={this.props.app}/>



            </div>
        );
    }
}

export default ProfileNav;