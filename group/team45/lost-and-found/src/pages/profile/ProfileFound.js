import React from "react";
import "./style.css";
import ProfileNav from "../../components/ProfileNav";
import { Link } from "react-router-dom";
const API_HOST = 'http://localhost:5000'
class ProfileFound extends React.Component {
    state = {
        items: this.props.app.state.founds
    }


    render() {
        const deleteCard = event => {
            const post_id = event.target.id
            
            const request = new Request(`${API_HOST}/user/post`, {
                method: "delete",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    post: post_id,
                    user: this.props.app.state.id
                }),
            });

            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        const temp = this.state.items.filter(item => item._id !== post_id)
                        this.setState({ items: temp })
                        this.props.app.setState({ founds: temp })
                        console.log(this.state)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        
        console.log(this.state.items)
        return (
            <div>
                <ProfileNav />
                
                <div id="CardContainer">
                <p className="explanation">Here are all the items you found</p>
                    {this.state.items.map((data) => {
                        return (
                            <div className="rectangle">
                                <button id={data._id.valueOf()} className="deleteButton" onClick={deleteCard}>x</button>
                                <div className="cardInner">
                                <Link to={"/post/?id=" + data._id.valueOf()} className="displayIdLink"><h3>{data.item}</h3></Link>
                                    <p> time: {data.time}</p>
                                    <p> location: {data.location}</p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        );

    }
}

export default ProfileFound;