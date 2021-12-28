import React from "react";
import "./style.css";
import ProfileNav from "../../components/ProfileNav";
import ProfileSavedInfo from "../../components/ProfileSavedInfo";
const API_HOST = 'http://localhost:5000'

class Profile extends React.Component {
    state = {
        edit: false,
        username: this.props.app.state.username,
        password: this.props.app.state.password,
        email: this.props.app.state.email,
        phone: this.props.app.state.phone,
    }

    save = () => {
        
        const request = new Request(`${API_HOST}/profile`, {
            method: "PATCH",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: this.props.app.state.id,
                name: this.props.app.state.username,
                password: this.props.app.state.password,
                email: this.props.app.state.email

            }),
        });

        fetch(request)
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    this.setState({ edit: false })
                }
            })
    }

    render() {

        const handleChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;


            this.setState({
                [name]: value
            });
        }
        if (this.state.edit) {
            return (
                <div>
                    <ProfileNav app={this.props.app}/>
                    <div id="infoContainer">
                        <div>
                            <form>
                                <p>
                                    <label>Username:</label>
                                    <input type="text" name="username" onChange={handleChange} defaultValue={this.state.username} />
                                </p>
                                <p>
                                    <label>Password:</label>
                                    <input type="text" name="password" onChange={handleChange} defaultValue={this.state.password} />
                                </p>
                                <p>
                                    <label>Email:</label>
                                    <input type="text" name="email" onChange={handleChange} defaultValue={this.state.email} />
                                </p>
                                <p>
                                    <label>Phone:</label>
                                    <input type="text" name="phone" onChange={handleChange} defaultValue={this.state.phone} />
                                </p>
                            </form>
                        </div>
                        <button class="editButton" type="button" onClick={this.save}>save</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <ProfileNav app={this.props.app}/>
                    <div id="infoContainer">
                        <ProfileSavedInfo info={this.state} />
                        <button class="editButton" type="button" onClick={() => { this.setState({ edit: true }) }}>edit</button>
                    </div>
                </div>
            );
        }

    }
}

export default Profile;