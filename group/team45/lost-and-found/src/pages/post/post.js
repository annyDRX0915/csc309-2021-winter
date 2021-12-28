import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import $ from "jquery";
import "./post.css";


import Header from "../../components/header.js";

import QuestionMark from "../../photos/quesiton_mark.png"

const API_HOST = 'http://localhost:5000'


function Post(props) {
    const { search } = useLocation();
    const { id } = queryString.parse(search);


    const [post, setPost] = useState({
        _id: "",
        user_id: "",
        username: "",
        item: "",
        type: "",
        date: "",
        time: "",
        location: "",
        description: "",
        discussions: []
    });
    
    const request = new Request(`${API_HOST}/post/id`, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if(res.status === 200) {
                return res.json()
            }
        })
        .then(json => {
            setPost(json)
        })
        .catch(error => {
            console.log(error);
        });

    const [postField, setPostField] = useState("");

    const add = () => {
        console.log(props.app.state.id);
        const date = new Date();

        const request = new Request(`${API_HOST}/makediscussion`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id: post._id.valueOf(),
                user_id: props.app.state.id,
                date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
                time: date.getHours() + ":" + date.getMinutes(),
                content: postField
            })
        });
    
        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if(res.status === 200) {
                    return res.json()
                }
            })
            .then(json => {
                setPost(json)
            })
            .catch(error => {
                console.log(error);
            });

        setPostField("");
        $("#PostReplyBox").val('');
    }
    return(
        <div>
            <Header app={props.app}/>
            <div id="postContainer">
                <div className="postTitle"><h2>{post.item}</h2></div>
                <img src={QuestionMark} className="postCardImg" alt="lg"/>
                <div className="postInfoContainer">
                    <p> Type: {post.type}</p>
                    <p> Time: {post.date + " " + post.time}</p>
                    <p> Location: {post.location}</p>
                    <p> Publisher: {post.username}</p>
                </div>
            </div>

            <textarea id='PostReplyBox'
                type='text'
                name='reply' 
                rows="3"
                placeholder='Please enter your comment'
                onChange={(e) => setPostField(e.target.value)}/>

            <div id='PostReplyButtonContainer'>
                <button onClick={add} className='PostReplyButton'>Reply</button>
            </div>

            {(post.discussions).map((discussion) => {
                        return (
                        <div id="PostReplyContainer" key={discussion._id.valueOf()}>
                            <img src={QuestionMark} className="postReplyImg" alt="lg"/>
                            <div className='postReplyUsername'>{discussion.username}</div>
                            <div className='postReplyTime'>publish time: {discussion.date + " " + discussion.time}</div>
                            <div className='postReplyContent'>{discussion.content}</div>
                        </div>
                        )
                    }
                )}

        </div>
    )
}

export default Post;
