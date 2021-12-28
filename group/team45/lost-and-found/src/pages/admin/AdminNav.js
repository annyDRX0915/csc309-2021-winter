import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/adminHeader";
class AdminNav extends React.Component {
    render() {
        return (
            <div>
                <ul id="navBarContainer">
                    <li><Link to="/admin/user" id="first">Profile</Link></li>
                    <li><Link to="/admin/post">Post</Link></li>
                    <li><Link to="/admin/request-table">Request</Link></li>
                </ul>
                
                <AdminHeader app={this.props.app}/>



            </div>
        );
    }
}

export default AdminNav;