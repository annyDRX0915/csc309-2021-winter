import React from "react";
import "./style.css";

class ProfileInfo extends React.Component {
    state = {
        username: this.props.info.username,
        password: this.props.info.password,
        email: this.props.info.email,
        phone: this.props.info.phone
    }
    render() {
        return (
            <div>

                <form>
                    <p>
                        <label>Username: <span id="profile-name">{this.state.username}</span></label>
                    </p>
                    <p>
                        <label>Password: <span id="profile-password">{this.state.password}</span></label>
                    </p>
                    <p>
                        <label>Email: <span id="profile-email">{this.state.email}</span></label>
                    </p>
                    <p>
                        <label>Phone: <span id="profile-phone">{this.state.phone}</span></label>
                    </p>
                </form>


            </div>
        );
    }
}

export default ProfileInfo;