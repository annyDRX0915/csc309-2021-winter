import React from "react";
import "./style.css";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";

import { getPosts, deletePost } from "../../action/post";

import QuestionMark from "../../photos/quesiton_mark.png"

class AdminPosts extends React.Component {

    constructor(){
        super();
        this.state = {
            postList: []
        }
    }

    render() {
        getPosts(this)
        const { postList } = this.state;

        const deleteCard = event => {
            deletePost(event.target.id, this)
        }

        return (
            <div>
                <AdminNav />
                <div id="CardContainer">
                    {postList.map((data) => {
                        return (
                            <div className="rectangle">
                                <button id={data._id.valueOf()} className="deleteButton" onClick={deleteCard}>x</button>
                                <div className="cardInner">
                                <Link to={"/post/?id=" + data._id.valueOf()} className="displayIdLink"><h3>{data.item}</h3></Link>
                                <p> time: {data.date + " " + data.time}</p>
                                <p> location: {data.location}</p>
                                <img src={QuestionMark} className="displayCardImg" alt="lg"/>
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

export default AdminPosts;